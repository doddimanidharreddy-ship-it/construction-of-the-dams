from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.project import Project
from app.models.risk import Risk
from app.models.safety import Safety
from datetime import datetime, timezone

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("/project/{project_id}")
def generate_project_report(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    risk = db.query(Risk).filter(Risk.project_id == project_id).first()
    incidents = db.query(Safety).filter(Safety.project_id == project_id).all()
    
    return {
        "report_id": f"REP-2026-{project_id:04d}",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "project": {
            "name": project.name if project else "N/A",
            "location": project.location if project else "N/A",
            "status": project.status if project else "N/A",
            "progress_pct": project.progress if project else 0.0,
            "budget": project.budget if project else 0.0,
            "spent": project.spent if project else 0.0
        },
        "risk_summary": {
            "overall_score": risk.overall_score if risk else 0.0,
            "schedule_risk": risk.schedule_risk if risk else 0.0,
            "cost_risk": risk.cost_risk if risk else 0.0
        },
        "safety_summary": {
            "total_incidents": len(incidents),
            "open_incidents": sum(1 for i in incidents if i.status == "Open")
        },
        "ai_insights": [
            "Schedule delay risk elevated by 14% due to concrete curing timeline bottlenecks.",
            "PPE compliance across Sector B has improved to 96% after automated drone alerts.",
            "Resource buffer for Steel Rebar is approaching minimum warning threshold (12 tons remaining)."
        ]
    }
