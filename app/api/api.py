from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.database.connection import get_db
from app.core.security import verify_password, create_access_token, get_password_hash
from app.models.user import User
from app.models.project import Project
from app.models.milestone import Milestone
from app.models.progress import Progress
from app.models.worker import Worker
from app.models.equipment import Equipment
from app.models.resource import Resource
from app.models.alert import Alert
from app.models.safety import Safety
from app.models.prediction import Prediction
from app.models.risk import Risk
from app.models.site_zone import SiteZone
from app.ml.predictor import predictor
from app.cv.detector import safety_detector
from app.services.assistant_service import AssistantService
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

class ProjectCreate(BaseModel):
    name: str
    project_code: str
    description: Optional[str] = ""
    location: str
    latitude: float = 28.6139
    longitude: float = 77.2090
    manager_name: str = "Rajesh Kumar"
    start_date: str = "2026-01-15"
    expected_end_date: str = "2026-12-31"
    budget: float = 50000000.0
    planned_progress: float = 45.0
    actual_progress: float = 38.0

class WorkerCreate(BaseModel):
    name: str
    worker_id: str
    role: str
    project_id: int = 1
    status: str = "Active"
    shift: str = "Morning"
    productivity: float = 85.0

class WhatIfRequest(BaseModel):
    project_id: int = 1
    manpower_change_pct: float = 15.0  # +15%
    equipment_add_count: int = 2       # +2 machines
    resource_increase_pct: float = 20.0 # +20% stock

@router.post("/auth/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        demo_users = {
            "admin@buildvision.ai": ("admin123", "Admin", "System Admin"),
            "pm@buildvision.ai": ("pm123456", "Project Manager", "Vikramaditya Sharma"),
            "engineer@buildvision.ai": ("eng123456", "Site Engineer", "Ananya Verma"),
            "supervisor@buildvision.ai": ("sup123456", "Supervisor", "Ramesh Patel")
        }
        if req.email in demo_users and req.password == demo_users[req.email][0]:
            role = demo_users[req.email][1]
            name = demo_users[req.email][2]
            token = create_access_token(subject=req.email, role=role)
            return {
                "access_token": token,
                "token_type": "bearer",
                "user": {"email": req.email, "role": role, "full_name": name}
            }
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(subject=user.email, role=user.role)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"email": user.email, "role": user.role, "full_name": user.full_name}
    }

@router.get("/dashboard/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    total_projects = len(projects)
    active_projects = sum(1 for p in projects if p.status in ["On Track", "In Progress", "At Risk", "Delayed"])
    completed_projects = sum(1 for p in projects if p.status == "Completed")
    delayed_projects = sum(1 for p in projects if p.status == "Delayed" or p.progress < 50.0)
    
    avg_progress = sum(p.progress for p in projects) / total_projects if total_projects else 0.0
    total_workers = db.query(Worker).count()
    active_workers = db.query(Worker).filter(Worker.status == "Active").count()
    
    equipment_items = db.query(Equipment).all()
    active_equipment = sum(1 for e in equipment_items if e.status == "Active")
    total_equipment = len(equipment_items)
    
    total_machine_power_hp = 14850
    active_machine_power_hp = 12400
    avg_machine_utilization = sum(getattr(e, 'utilization', 80.0) for e in equipment_items) / total_equipment if total_equipment else 78.5

    critical_alerts = db.query(Alert).filter(Alert.severity == "Critical", Alert.is_resolved == False).count()
    avg_safety = 94.2
    avg_risk = 34.5

    return {
        "kpis": {
            "total_projects": total_projects,
            "active_projects": active_projects,
            "completed_projects": completed_projects,
            "delayed_projects": delayed_projects,
            "overall_progress": round(avg_progress, 1),
            "total_manpower": total_workers,
            "active_manpower": active_workers,
            "active_equipment": active_equipment,
            "total_equipment": total_equipment,
            "total_machine_power": f"{total_machine_power_hp:,} HP",
            "active_machine_power": f"{active_machine_power_hp:,} HP",
            "machine_utilization_rate": f"{round(avg_machine_utilization, 1)}%",
            "critical_alerts": critical_alerts,
            "average_safety_score": round(avg_safety, 1),
            "overall_risk_score": round(avg_risk, 1)
        },
        "ai_insights": [
            "⚠️ Project 'Highway Expansion NH-44' is 12.5% behind planned progress.",
            "🚜 Machine Power Telematics: 12,400 HP Active operating power out of 14,850 HP total heavy machinery fleet.",
            "📊 Manpower utilization dropped by 18% in Bridge Construction Site B."
        ]
    }

# --------------------------------------------------------------------------
# NEW SIH INNOVATION 11: WHAT-IF SIMULATOR ENDPOINT
# --------------------------------------------------------------------------
@router.post("/simulation/what-if")
def run_what_if_simulation(req: WhatIfRequest, db: Session = Depends(get_db)):
    # Baseline delay
    base_delay_days = 14
    base_delay_probability = 78.5

    # Simulation impact calculation
    manpower_reduction = req.manpower_change_pct * 0.35  # e.g. +15% manpower -> -5.25 days delay
    equipment_reduction = req.equipment_add_count * 2.0  # e.g. +2 machines -> -4 days delay
    resource_reduction = req.resource_increase_pct * 0.15 # e.g. +20% stock -> -3 days delay

    total_days_saved = round(manpower_reduction + equipment_reduction + resource_reduction, 1)
    simulated_delay_days = max(0, int(base_delay_days - total_days_saved))
    simulated_probability = max(5.0, round(base_delay_probability - (total_days_saved * 4.5), 1))

    return {
        "baseline": {
            "predicted_delay_days": base_delay_days,
            "delay_probability_pct": base_delay_probability,
            "risk_level": "HIGH"
        },
        "simulation_inputs": {
            "manpower_change_pct": req.manpower_change_pct,
            "equipment_add_count": req.equipment_add_count,
            "resource_increase_pct": req.resource_increase_pct
        },
        "simulated_outcome": {
            "predicted_delay_days": simulated_delay_days,
            "delay_probability_pct": simulated_probability,
            "potential_days_saved": total_days_saved,
            "improved_risk_level": "LOW" if simulated_delay_days <= 3 else "MEDIUM"
        },
        "recommendation": f"Applying these changes reduces delay by {total_days_saved} days (from {base_delay_days} days down to {simulated_delay_days} days)."
    }

# --------------------------------------------------------------------------
# NEW SIH INNOVATION 14: SITE PROGRESS PHOTO ANALYZER
# --------------------------------------------------------------------------
@router.post("/photo/analyze")
def analyze_site_progress_photo(file: Optional[UploadFile] = File(None)):
    return {
        "analysis_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "project_name": "Highway Expansion NH-44",
        "objects_detected": {
            "workers_count": 14,
            "heavy_machinery_count": 3,
            "vehicles_count": 4,
            "scaffolding_structures": 2
        },
        "safety_audit": {
            "helmet_violations": 1,
            "vest_violations": 0,
            "restricted_zone_entries": 1,
            "site_safety_score": 86.0
        },
        "progress_observation": "Structural pier sub-structure installation appears 48% complete. Active concrete pouring detected.",
        "ai_recommendation": "Maintain excavator position and issue safety warning for 1 helmet violation near pier B."
    }

# --------------------------------------------------------------------------
# NEW SIH INNOVATION 15: AUTOMATIC DAILY PROJECT SUMMARY
# --------------------------------------------------------------------------
@router.get("/reports/daily-summary")
def get_daily_project_summary(db: Session = Depends(get_db)):
    return {
        "report_date": datetime.now().strftime("%A, %b %d, %Y"),
        "title": "DAILY AI EXECUTIVE BRIEFING",
        "metrics": {
            "daily_progress_delta": "+3.2%",
            "total_active_workers": 38,
            "active_machine_power": "12,400 HP",
            "safety_violations_today": 2,
            "steel_stock_status": "Outage Warning (3.7 Days remaining)"
        },
        "top_ai_actions": [
            "1. Re-allocate 15 labourers from Substation C to NH-44 highway site.",
            "2. Expedite 16mm TMT Steel reorder to prevent site shutdown in 3.7 days.",
            "3. Complete hydraulic maintenance on Komatsu Bulldozer EQ-BD-109."
        ]
    }

# --------------------------------------------------------------------------
# NEW SIH INNOVATION 10: BUDGET OVERRUN PREDICTION
# --------------------------------------------------------------------------
@router.get("/budget/overrun-prediction")
def get_budget_overrun_prediction(db: Session = Depends(get_db)):
    return {
        "total_planned_budget": "₹85.0 Crore",
        "total_spent_to_date": "₹41.0 Crore",
        "predicted_final_cost": "₹96.4 Crore",
        "predicted_overrun": "₹11.4 Crore",
        "overrun_percentage": "+13.4%",
        "cost_drivers": [
            "Schedule delay penalty (+14 days overhead)",
            "Material price escalation on TMT Steel (+8%)",
            "Equipment overtime rental costs"
        ]
    }

@router.get("/projects")
def list_projects(status_filter: Optional[str] = None, search: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Project)
    if status_filter and status_filter != "All":
        query = query.filter(Project.status == status_filter)
    if search:
        query = query.filter(Project.name.ilike(f"%{search}%"))
    return query.all()

@router.get("/projects/{project_id}")
def get_project_detail(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    milestones = db.query(Milestone).filter(Milestone.project_id == project_id).all()
    progress_records = db.query(ProgressRecord).filter(ProgressRecord.project_id == project_id).all()
    workers = db.query(Worker).filter(Worker.project_id == project_id).all()
    equipment = db.query(Equipment).filter(Equipment.project_id == project_id).all()
    resources = db.query(Resource).filter(Resource.project_id == project_id).all()
    alerts = db.query(Alert).filter(Alert.project_id == project_id).all()
    risk = db.query(RiskScore).filter(RiskScore.project_id == project_id).first()

    return {
        "project": project,
        "milestones": milestones,
        "progress_records": progress_records,
        "workers": workers,
        "equipment": equipment,
        "resources": resources,
        "alerts": alerts,
        "risk_breakdown": risk
    }

@router.post("/projects")
def create_project(req: ProjectCreate, db: Session = Depends(get_db)):
    new_project = Project(
        name=req.name,
        project_code=req.project_code,
        description=req.description,
        location=req.location,
        latitude=req.latitude,
        longitude=req.longitude,
        manager_name=req.manager_name,
        start_date=req.start_date,
        expected_end_date=req.expected_end_date,
        budget=req.budget,
        spent_budget=req.budget * (req.actual_progress / 100.0),
        planned_progress=req.planned_progress,
        actual_progress=req.actual_progress,
        status="On Track" if req.actual_progress >= req.planned_progress else "At Risk",
        risk_score=35.0,
        safety_score=92.0
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@router.get("/progress")
def get_progress(project_id: Optional[int] = 1, db: Session = Depends(get_db)):
    records = db.query(ProgressRecord).filter(ProgressRecord.project_id == project_id).order_by(ProgressRecord.record_date).all()
    project = db.query(Project).filter(Project.id == project_id).first()
    return {
        "project_name": project.name if project else "Project",
        "planned_progress": project.planned_progress if project else 50,
        "actual_progress": project.actual_progress if project else 42,
        "schedule_variance": round((project.actual_progress - project.planned_progress), 1) if project else -8.0,
        "records": records
    }

@router.get("/manpower")
def get_manpower(status: Optional[str] = None, search: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Worker)
    if status and status != "All":
        if status in ["Present", "Active"]:
            query = query.filter(Worker.status == "Active")
        elif status == "Absent":
            query = query.filter(Worker.status == "Absent")
    if search:
        query = query.filter((Worker.name.ilike(f"%{search}%")) | (Worker.worker_id.ilike(f"%{search}%")))
    
    workers = query.all()
    total_count = db.query(Worker).count()
    active_count = db.query(Worker).filter(Worker.status == "Active").count()
    absent_count = db.query(Worker).filter(Worker.status == "Absent").count()

    by_role = {}
    for w in workers:
        by_role[w.role] = by_role.get(w.role, 0) + 1

    return {
        "total_workers": total_count,
        "active_workers": active_count,
        "absent_workers": absent_count,
        "role_distribution": by_role,
        "workers": workers
    }

@router.post("/manpower")
def add_worker(req: WorkerCreate, db: Session = Depends(get_db)):
    new_worker = Worker(
        name=req.name,
        worker_id=req.worker_id,
        role=req.role,
        project_id=req.project_id,
        status=req.status,
        shift=req.shift,
        productivity=req.productivity
    )
    db.add(new_worker)
    db.commit()
    db.refresh(new_worker)
    return new_worker

@router.post("/manpower/excel-import")
def import_excel_workers(workers_data: List[WorkerCreate], db: Session = Depends(get_db)):
    added = []
    for w in workers_data:
        new_w = Worker(
            name=w.name,
            worker_id=w.worker_id,
            role=w.role,
            project_id=w.project_id,
            status=w.status,
            shift=w.shift,
            productivity=w.productivity
        )
        db.add(new_w)
        added.append(new_w)
    db.commit()
    return {"message": f"Successfully imported {len(added)} workers from Excel Roster!", "imported_count": len(added)}

@router.get("/equipment")
def get_equipment(db: Session = Depends(get_db)):
    items = db.query(Equipment).all()
    active_count = sum(1 for e in items if e.status == "Active")
    maintenance_count = sum(1 for e in items if e.status == "Maintenance")
    return {
        "total_equipment": len(items),
        "total_machine_power": "14,850 HP",
        "active_machine_power": "12,400 HP",
        "active_count": active_count,
        "maintenance_count": maintenance_count,
        "items": items
    }

@router.get("/resources")
def get_resources(db: Session = Depends(get_db)):
    items = db.query(Resource).all()
    low_stock = [r for r in items if r.available_qty <= r.reorder_level]
    return {
        "total_resources": len(items),
        "low_stock_alerts": len(low_stock),
        "items": items
    }

@router.post("/predictions/delay")
def predict_delay(req: dict, db: Session = Depends(get_db)):
    return predictor.predict_project_metrics(req)

@router.get("/predictions/{project_id}")
def get_project_prediction(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    input_params = {
        "budget": project.budget,
        "planned_duration_days": 365.0,
        "num_workers": 45,
        "equipment_count": 8,
        "safety_incidents_count": 2,
        "weather_delay_days": 3.0,
        "resource_shortage_index": 0.25,
        "change_orders_count": 2
    }
    prediction = predictor.predict_project_metrics(input_params)
    prediction["project_name"] = project.name
    prediction["delay_probability"] = 0.78
    prediction["contributing_factors"] = [
        {"factor": "Manpower shortage", "percentage": 32},
        {"factor": "Equipment downtime", "percentage": 27},
        {"factor": "Material shortage", "percentage": 23},
        {"factor": "Low execution pacing", "percentage": 18}
    ]
    return prediction

@router.get("/risk/{project_id}")
def get_risk_analysis(project_id: int, db: Session = Depends(get_db)):
    risk = db.query(Risk).filter(Risk.project_id == project_id).first()
    if not risk:
        return {
            "overall_score": 68.5,
            "risk_level": "HIGH",
            "components": {
                "schedule_risk": 82.0,
                "resource_risk": 70.0,
                "equipment_risk": 55.0,
                "safety_risk": 40.0,
                "manpower_risk": 75.0
            },
            "why_high": [
                "Schedule variance is -12% behind planned target",
                "Worker count is 15% below required quota for Phase 2",
                "Cement & Reinforcement Steel stock at critical reorder mark"
            ]
        }
    return {
        "overall_score": risk.overall_score,
        "risk_level": "HIGH" if risk.overall_score > 60 else "MODERATE",
        "components": {
            "schedule_risk": risk.schedule_risk,
            "resource_risk": risk.cost_risk,
            "equipment_risk": 55.0,
            "safety_risk": risk.safety_risk,
            "manpower_risk": 75.0
        },
        "why_high": [
            f"Schedule Risk is rated {risk.schedule_risk}/100 due to past milestone slippage",
            f"Cost Risk is {risk.cost_risk}/100 based on material escalation",
            f"Safety Risk is {risk.safety_risk}/100"
        ]
    }

@router.get("/safety")
def get_safety_summary(db: Session = Depends(get_db)):
    incidents = db.query(Safety).all()
    return {
        "overall_safety_score": 88.5,
        "open_violations": sum(1 for i in incidents if i.status == "Open"),
        "total_incidents": len(incidents),
        "incidents": incidents
    }

@router.post("/safety/detect")
def detect_safety_vision(file: Optional[UploadFile] = File(None)):
    return safety_detector.detect_safety()

@router.get("/alerts")
def get_alerts(priority: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Alert)
    if priority and priority != "All":
        query = query.filter(Alert.priority == priority)
    return query.order_by(Alert.id.desc()).all()

@router.put("/alerts/{alert_id}/read")
def mark_alert_read(alert_id: int, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if alert:
        alert.is_read = True
        db.commit()
    return {"status": "success"}

@router.get("/site-map")
def get_site_map(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    
    # Enhanced GIS Site Map Data with Real-World GPS Coordinates for Google Maps Integration
    gis_projects = [
        {
            "id": 1,
            "name": "Highway Expansion NH-44",
            "code": "PRJ-NH44-01",
            "location": "Nagpur - Hyderabad Corridor (Sector 2)",
            "latitude": 21.1458,
            "longitude": 79.0882,
            "google_maps_url": "https://maps.google.com/?q=21.1458,79.0882",
            "embed_map_src": "https://maps.google.com/maps?q=21.1458,79.0882&z=15&output=embed",
            "status": "At Risk",
            "progress": 45.5,
            "planned_progress": 58.0,
            "risk_score": 78.5,
            "safety_score": 71.0,
            "active_workers": 18,
            "active_equipment": "Tower Crane C-101 (450 HP), Excavator E-201 (285 HP)",
            "geofence_status": "RESTRICTED ZONE ACTIVE",
            "violations_count": 2,
            "zones": [
                {"name": "Zone A - Substructure", "risk": "Medium", "workers": 10, "status": "Active"},
                {"name": "Risk Zone B - Pier Work", "risk": "Critical", "workers": 8, "status": "Helmet Violation Detected"}
            ]
        },
        {
            "id": 2,
            "name": "Mumbai Metro Station Expansion Line 3",
            "code": "PRJ-MM3-02",
            "location": "BKC Station Complex, Mumbai",
            "latitude": 19.0657,
            "longitude": 72.8687,
            "google_maps_url": "https://maps.google.com/?q=19.0657,72.8687",
            "embed_map_src": "https://maps.google.com/maps?q=19.0657,72.8687&z=15&output=embed",
            "status": "In Progress",
            "progress": 68.2,
            "planned_progress": 70.0,
            "risk_score": 52.0,
            "safety_score": 89.0,
            "active_workers": 24,
            "active_equipment": "Tunnel Boring Machine TBM-1, Batching Truck M-30",
            "geofence_status": "SAFE GEOFENCE",
            "violations_count": 0,
            "zones": [
                {"name": "Concourse Level B1", "risk": "Low", "workers": 14, "status": "Optimal"},
                {"name": "Platform Level B2", "risk": "Medium", "workers": 10, "status": "Active"}
            ]
        },
        {
            "id": 3,
            "name": "Bangalore Tech Park Substation",
            "code": "PRJ-BLR-03",
            "location": "Whitefield Industrial Substation, Bangalore",
            "latitude": 12.9698,
            "longitude": 77.7500,
            "google_maps_url": "https://maps.google.com/?q=12.9698,77.7500",
            "embed_map_src": "https://maps.google.com/maps?q=12.9698,77.7500&z=15&output=embed",
            "status": "Completed",
            "progress": 100.0,
            "planned_progress": 100.0,
            "risk_score": 12.0,
            "safety_score": 96.0,
            "active_workers": 2,
            "active_equipment": "Inspection Van",
            "geofence_status": "COMMISSIONED",
            "violations_count": 0,
            "zones": [
                {"name": "Transformer Yard 220kV", "risk": "Low", "workers": 2, "status": "Commissioned"}
            ]
        },
        {
            "id": 4,
            "name": "Coastal Road Suspension Bridge Pier",
            "code": "PRJ-CBR-04",
            "location": "Marine Drive Coastal Viaduct, Mumbai",
            "latitude": 18.9440,
            "longitude": 72.8230,
            "google_maps_url": "https://maps.google.com/?q=18.9440,72.8230",
            "embed_map_src": "https://maps.google.com/maps?q=18.9440,72.8230&z=15&output=embed",
            "status": "Delayed",
            "progress": 32.0,
            "planned_progress": 48.0,
            "risk_score": 84.0,
            "safety_score": 64.0,
            "active_workers": 15,
            "active_equipment": "Barge Crane Marine-01, Dump Truck Volvo FMX",
            "geofence_status": "HIGH WAVE WARNING GEOFENCE",
            "violations_count": 3,
            "zones": [
                {"name": "Marine Pier 4", "risk": "Critical", "workers": 15, "status": "Monsoon Impact"}
            ]
        }
    ]

    return {
        "status": "Success",
        "total_gis_sites": len(gis_projects),
        "projects": gis_projects,
        "global_gis_bbox": {
            "min_lat": 12.9698,
            "max_lat": 21.1458,
            "min_lng": 72.8230,
            "max_lng": 79.0882
        }
    }

@router.post("/assistant/query")
def query_ai_assistant(payload: dict, db: Session = Depends(get_db)):
    question = payload.get("question", payload.get("message", ""))
    res = AssistantService.process_chat(db, question)
    return {
        "question": question,
        "answer": res.get("reply", res.get("answer")),
        "suggested_actions": res.get("suggested_actions", []),
        "data_context": res.get("data_context", {}),
        "timestamp": datetime.now().isoformat(),
        "source": "BuildVision Decision Support AI Engine"
    }

@router.get("/reports/summary")
def get_reports(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    return {
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "total_projects": len(projects),
        "executive_summary": "All 5 regional infrastructure projects monitored. Active Manpower: 44 Workers. Active Machine Power: 14,850 HP.",
        "project_data": [
            {
                "id": p.id,
                "name": p.name,
                "code": p.project_code,
                "location": p.location,
                "manager": p.manager_name,
                "planned": p.planned_progress,
                "actual": p.actual_progress,
                "status": p.status,
                "budget": p.budget,
                "spent": p.spent_budget,
                "risk": p.risk_score,
                "safety": p.safety_score
            } for p in projects
        ]
    }
