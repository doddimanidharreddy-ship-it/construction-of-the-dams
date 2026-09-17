from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.project import Project
from app.models.worker import Worker
from app.models.equipment import Equipment
from app.models.alert import Alert
from app.models.safety import Safety
from app.models.risk import Risk
from sqlalchemy import func

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    total_projects = len(projects)
    
    avg_progress = db.query(func.avg(Project.progress)).scalar() or 0.0
    total_budget = db.query(func.sum(Project.budget)).scalar() or 0.0
    total_spent = db.query(func.sum(Project.spent)).scalar() or 0.0
    
    active_workers = db.query(Worker).filter(Worker.status == "Active").count()
    active_equipment = db.query(Equipment).filter(Equipment.status == "Operational").count()
    open_alerts = db.query(Alert).filter(Alert.is_resolved == False).count()
    safety_incidents = db.query(Safety).filter(Safety.status == "Open").count()
    
    avg_risk = db.query(func.avg(Risk.overall_score)).scalar() or 38.5
    
    project_list = [
        {
            "id": p.id,
            "name": p.name,
            "location": p.location,
            "status": p.status,
            "progress": p.progress,
            "budget": p.budget,
            "spent": p.spent,
            "site_image_url": p.site_image_url
        }
        for p in projects
    ]

    return {
        "total_projects": total_projects,
        "average_progress_pct": round(float(avg_progress), 1),
        "total_budget": float(total_budget),
        "total_spent": float(total_spent),
        "active_workers": active_workers,
        "active_equipment": active_equipment,
        "open_alerts": open_alerts,
        "open_safety_incidents": safety_incidents,
        "portfolio_risk_score": round(float(avg_risk), 1),
        "projects": project_list
    }
