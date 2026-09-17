import os
import json
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from app.database.connection import engine, SessionLocal, Base
import app.models # Ensure all models are registered
from app.models.user import User
from app.models.project import Project
from app.models.milestone import Milestone
from app.models.progress import Progress
from app.models.worker import Worker
from app.models.attendance import Attendance
from app.models.equipment import Equipment
from app.models.maintenance import Maintenance
from app.models.resource import Resource
from app.models.consumption import Consumption
from app.models.safety import Safety
from app.models.alert import Alert
from app.models.risk import Risk
from app.models.site_zone import SiteZone
from app.models.prediction import Prediction
from app.core.security import get_password_hash

def seed_database():
    print("Initializing Database tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    try:
        print("Seeding Users...")
        users = [
            User(
                email="admin@buildvision.ai",
                hashed_password=get_password_hash("admin123"),
                full_name="Alex Mercer (Admin)",
                role="admin",
                avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            ),
            User(
                email="pm@buildvision.ai",
                hashed_password=get_password_hash("pm123456"),
                full_name="Sarah Jenkins (PM)",
                role="pm",
                avatar="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
            ),
            User(
                email="engineer@buildvision.ai",
                hashed_password=get_password_hash("eng123456"),
                full_name="David Chen (Lead Engineer)",
                role="engineer",
                avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
            ),
            User(
                email="supervisor@buildvision.ai",
                hashed_password=get_password_hash("sup123456"),
                full_name="Marcus Vance (Site Supervisor)",
                role="supervisor",
                avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
            )
        ]
        db.add_all(users)
        db.commit()

        print("Seeding Projects...")
        now = datetime.now(timezone.utc)
        projects = [
            Project(
                name="Horizon Sky Tower",
                description="62-story mixed-use commercial skyscraper featuring sustainable glass facade and LEED Gold certification.",
                location="Financial District, Sector 4",
                status="In Progress",
                progress=64.5,
                start_date=now - timedelta(days=240),
                end_date=now + timedelta(days=180),
                budget=45000000.0,
                spent=28900000.0,
                site_image_url="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=800"
            ),
            Project(
                name="Metro Line Phase 3",
                description="14km elevated transit railway with 8 underground stations and smart signaling integration.",
                location="Metropolitan Transit Corridor",
                status="Delayed",
                progress=41.2,
                start_date=now - timedelta(days=320),
                end_date=now + timedelta(days=210),
                budget=82000000.0,
                spent=48500000.0,
                site_image_url="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"
            ),
            Project(
                name="Coastal Highway Bridge",
                description="Dual-cantilever cable-stayed bridge spanning 2.8 kilometers across coastal bay area.",
                location="North Bay Route 101",
                status="In Progress",
                progress=82.0,
                start_date=now - timedelta(days=400),
                end_date=now + timedelta(days=90),
                budget=65000000.0,
                spent=54100000.0,
                site_image_url="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800"
            ),
            Project(
                name="Tech Park Innovation Hub",
                description="Modern 5-building corporate campus with solar power integration, underground parking, and parkland.",
                location="Silicon Zone 9",
                status="In Progress",
                progress=28.4,
                start_date=now - timedelta(days=110),
                end_date=now + timedelta(days=340),
                budget=38000000.0,
                spent=11200000.0,
                site_image_url="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
            ),
            Project(
                name="Green Valley Eco-Residences",
                description="250-unit sustainable residential smart community with rainwater harvesting and solar grids.",
                location="Suburban West District",
                status="In Progress",
                progress=52.0,
                start_date=now - timedelta(days=190),
                end_date=now + timedelta(days=160),
                budget=24000000.0,
                spent=13100000.0,
                site_image_url="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800"
            )
        ]
        db.add_all(projects)
        db.commit()

        p1, p2, p3, p4, p5 = projects[0], projects[1], projects[2], projects[3], projects[4]

        print("Seeding Milestones...")
        milestones = [
            Milestone(project_id=p1.id, title="Foundation Pier Curing", target_date=now - timedelta(days=180), status="Completed", progress=100.0),
            Milestone(project_id=p1.id, title="Structural Steel Superstructure Floor 1-30", target_date=now - timedelta(days=30), status="Completed", progress=100.0),
            Milestone(project_id=p1.id, title="Curtain Wall Glass Installation Floor 31-45", target_date=now + timedelta(days=45), status="In Progress", progress=60.0),
            Milestone(project_id=p1.id, title="Interior MEP Rough-in", target_date=now + timedelta(days=120), status="Pending", progress=15.0),
            
            Milestone(project_id=p2.id, title="Sub-surface Tunnel Boring", target_date=now - timedelta(days=90), status="Completed", progress=100.0),
            Milestone(project_id=p2.id, title="Station 4-7 Track Laying", target_date=now - timedelta(days=10), status="Delayed", progress=45.0),
            Milestone(project_id=p2.id, title="Electrical Substation Integration", target_date=now + timedelta(days=80), status="Pending", progress=0.0),
            
            Milestone(project_id=p3.id, title="Tower Pylon Hydro-jacking", target_date=now - timedelta(days=200), status="Completed", progress=100.0),
            Milestone(project_id=p3.id, title="Stay Cable Tension Testing", target_date=now - timedelta(days=20), status="Completed", progress=100.0),
            Milestone(project_id=p3.id, title="Asphalt Deck Surface Paving", target_date=now + timedelta(days=30), status="In Progress", progress=75.0),
        ]
        db.add_all(milestones)
        db.commit()

        print("Seeding Progress Records...")
        progress_recs = [
            Progress(project_id=p1.id, date=now - timedelta(days=14), progress_pct=61.0, notes="Floor 34 slab pouring completed.", image_url="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7", verified_by_cv=True),
            Progress(project_id=p1.id, date=now - timedelta(days=7), progress_pct=63.2, notes="HVAC ducting installed on floor 20.", image_url="https://images.unsplash.com/photo-1504307651254-35680f356dfd", verified_by_cv=True),
            Progress(project_id=p1.id, date=now, progress_pct=64.5, notes="Curtain wall panels verified by computer vision feed.", image_url="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab", verified_by_cv=True),
            Progress(project_id=p2.id, date=now - timedelta(days=5), progress_pct=40.5, notes="Rail alignment check passed.", verified_by_cv=False),
            Progress(project_id=p2.id, date=now, progress_pct=41.2, notes="Tunnel ventilation system testing.", verified_by_cv=True),
        ]
        db.add_all(progress_recs)
        db.commit()

        print("Seeding Workers & Attendance...")
        workers = [
            Worker(name="Robert Vance", role="Lead Crane Operator", skill="Expert", status="Active", project_id=p1.id, phone="+1 555-0192", hourly_rate=48.0),
            Worker(name="Carlos Rivera", role="Structural Mason", skill="Skilled", status="Active", project_id=p1.id, phone="+1 555-0183", hourly_rate=32.0),
            Worker(name="Elena Rostova", role="Electrical Engineer", skill="Expert", status="Active", project_id=p1.id, phone="+1 555-0174", hourly_rate=55.0),
            Worker(name="Tariq Mansoor", role="Safety Inspector", skill="Expert", status="Active", project_id=p1.id, phone="+1 555-0165", hourly_rate=42.0),
            Worker(name="John Miller", role="Heavy Machinery Operator", skill="Skilled", status="Active", project_id=p2.id, phone="+1 555-0156", hourly_rate=36.0),
            Worker(name="Siddharth Patel", role="Civil Carpenter", skill="Skilled", status="Active", project_id=p2.id, phone="+1 555-0147", hourly_rate=30.0),
            Worker(name="Michael Chang", role="Steel Rigging Tech", skill="Skilled", status="Active", project_id=p3.id, phone="+1 555-0138", hourly_rate=38.0),
            Worker(name="Anna Kowalski", role="Quality Assurance Specialist", skill="Expert", status="Active", project_id=p3.id, phone="+1 555-0129", hourly_rate=50.0),
        ]
        db.add_all(workers)
        db.commit()

        for w in workers:
            att = Attendance(worker_id=w.id, project_id=w.project_id or p1.id, date=now, status="Present", hours_worked=8.0)
            db.add(att)
        db.commit()

        print("Seeding Equipment & Maintenance...")
        equipments = [
            Equipment(name="Liebherr Tower Crane 800", type="Tower Crane", serial_number="TC-800-4491", project_id=p1.id, status="Operational", fuel_level_pct=88.5, hours_used=1420.0, last_maintenance_date=now - timedelta(days=12)),
            Equipment(name="CAT 349 Hydraulic Excavator", type="Excavator", serial_number="EX-204-9920", project_id=p1.id, status="Operational", fuel_level_pct=64.0, hours_used=2890.0, last_maintenance_date=now - timedelta(days=5)),
            Equipment(name="Schwing Concrete Pump Truck", type="Concrete Pump", serial_number="CP-120-3341", project_id=p2.id, status="Maintenance Required", fuel_level_pct=42.0, hours_used=3100.0, last_maintenance_date=now - timedelta(days=45)),
            Equipment(name="Komatsu D155AX Bulldozer", type="Bulldozer", serial_number="BD-50-7712", project_id=p3.id, status="Operational", fuel_level_pct=92.0, hours_used=980.0, last_maintenance_date=now - timedelta(days=20)),
            Equipment(name="Volvo FMX Dump Truck 10-Wheeler", type="Dump Truck", serial_number="DT-10-8833", project_id=p4.id, status="Idle", fuel_level_pct=75.0, hours_used=1650.0, last_maintenance_date=now - timedelta(days=30))
        ]
        db.add_all(equipments)
        db.commit()

        maint = Maintenance(
            equipment_id=equipments[2].id,
            title="Hydraulic Pump Valve Overhaul",
            date=now + timedelta(days=2),
            cost=4500.0,
            type="Preventive",
            status="Scheduled",
            description="Replace high-pressure seals and flush hydraulic fluid."
        )
        db.add(maint)
        db.commit()

        print("Seeding Resources & Consumption...")
        resources = [
            Resource(name="Portland Cement Type I", type="Raw Material", project_id=p1.id, current_stock=340.0, unit="bags", unit_cost=14.5, threshold_warning=50.0),
            Resource(name="Grade 60 Steel Rebar #4", type="Structural", project_id=p1.id, current_stock=18.5, unit="tons", unit_cost=920.0, threshold_warning=15.0),
            Resource(name="Ready-Mix Concrete C35", type="Raw Material", project_id=p2.id, current_stock=120.0, unit="cubic meters", unit_cost=110.0, threshold_warning=30.0),
            Resource(name="Diesel Fuel Low Sulfur", type="Fuel", project_id=p3.id, current_stock=4500.0, unit="liters", unit_cost=1.45, threshold_warning=1000.0),
            Resource(name="Structural Steel Beams I-300", type="Structural", project_id=p4.id, current_stock=8.0, unit="tons", unit_cost=1250.0, threshold_warning=10.0)
        ]
        db.add_all(resources)
        db.commit()

        con1 = Consumption(resource_id=resources[0].id, project_id=p1.id, date=now - timedelta(days=1), quantity_used=45.0, recorded_by="Supervisor Marcus")
        con2 = Consumption(resource_id=resources[1].id, project_id=p1.id, date=now - timedelta(days=2), quantity_used=4.2, recorded_by="Engineer David")
        db.add_all([con1, con2])
        db.commit()

        print("Seeding Safety Incidents & Alerts...")
        safeties = [
            Safety(project_id=p1.id, incident_type="PPE Violation", severity="Medium", description="2 workers detected without safety harnesses on Sector 4 scaffolding level 12 by AI camera.", status="Open", zone="Zone A - Tower Structure"),
            Safety(project_id=p2.id, incident_type="Equipment Proximity Near-Miss", severity="High", description="Excavator bucket swung within 1.5m of utility conduit during digging.", status="Under Investigation", zone="Zone C - Tunnel Entry"),
            Safety(project_id=p3.id, incident_type="Minor Slip Hazard", severity="Low", description="Oil drip from hydraulic pump clean-up required.", status="Resolved", zone="Zone B - Deck Area")
        ]
        db.add_all(safeties)
        db.commit()

        alerts = [
            Alert(project_id=p1.id, title="High Risk: Material Supply Delay", description="Steel Rebar stock at 18.5 tons (threshold: 15.0 tons). Shipment delayed by 3 days due to port congestion.", severity="High", category="Inventory"),
            Alert(project_id=p1.id, title="CV Safety Alert: Unharnessed Worker", description="Camera Feed #4 flagged PPE non-compliance on floor 34 exterior ledger.", severity="Critical", category="Safety"),
            Alert(project_id=p2.id, title="Schedule Slippage Warning", description="Predicted delay increased to +14 days based on track laying velocity.", severity="High", category="Delay"),
            Alert(project_id=p3.id, title="Weather Warning: Coastal Storm", description="Heavy rainfall and high winds forecasted for Thursday. Crane lifts recommended suspended.", severity="Medium", category="Weather")
        ]
        db.add_all(alerts)
        db.commit()

        print("Seeding Risk Scores, Site Zones & Predictions...")
        risks = [
            Risk(project_id=p1.id, overall_score=38.4, schedule_risk=28.0, cost_risk=32.0, safety_risk=45.0, weather_risk=20.0, top_risk_factors=json.dumps(["Steel Rebar buffer low", "Subcontractor staffing shortage floor 30+"])),
            Risk(project_id=p2.id, overall_score=68.2, schedule_risk=74.0, cost_risk=65.0, safety_risk=52.0, weather_risk=40.0, top_risk_factors=json.dumps(["Sub-surface rock hardness variance", "Track alignment calibration delay"])),
            Risk(project_id=p3.id, overall_score=24.0, schedule_risk=18.0, cost_risk=22.0, safety_risk=15.0, weather_risk=55.0, top_risk_factors=json.dumps(["Coastal wind gusts", "High tide marine logistics"])),
            Risk(project_id=p4.id, overall_score=42.0, schedule_risk=35.0, cost_risk=40.0, safety_risk=30.0, weather_risk=15.0, top_risk_factors=json.dumps(["Permit approval delay for Sector 3"])),
            Risk(project_id=p5.id, overall_score=29.5, schedule_risk=22.0, cost_risk=25.0, safety_risk=20.0, weather_risk=10.0, top_risk_factors=json.dumps(["Minor masonry worker shift variance"]))
        ]
        db.add_all(risks)
        db.commit()

        zones = [
            SiteZone(project_id=p1.id, zone_name="Zone A - Tower Superstructure", coordinates_json=json.dumps({"x": 120, "y": 80, "w": 300, "h": 250}), status="Active", worker_count=18, equipment_count=2, active_alerts=2),
            SiteZone(project_id=p1.id, zone_name="Zone B - Ground Podium & Staging", coordinates_json=json.dumps({"x": 450, "y": 80, "w": 280, "h": 200}), status="Active", worker_count=12, equipment_count=3, active_alerts=0),
            SiteZone(project_id=p1.id, zone_name="Zone C - Underground Parking", coordinates_json=json.dumps({"x": 120, "y": 360, "w": 610, "h": 180}), status="Restricted", worker_count=5, equipment_count=1, active_alerts=1),
        ]
        db.add_all(zones)
        db.commit()

        pred = Prediction(
            project_id=p1.id,
            target_metric="Schedule_Delay",
            predicted_value=12.5,
            confidence=0.89,
            features_used=json.dumps({"budget": 45000000, "workers": 35, "incidents": 1}),
            model_version="v1.2.0"
        )
        db.add(pred)
        db.commit()

        print("Database seeded successfully!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
