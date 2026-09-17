from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.schemas import AlertResponse, AlertCreate
from app.services.alert_service import AlertService

router = APIRouter(prefix="/alerts", tags=["Alerts"])

@router.get("/{project_id}", response_model=List[AlertResponse])
def get_alerts(project_id: int, db: Session = Depends(get_db)):
    return AlertService.get_project_alerts(db, project_id)

@router.post("", response_model=AlertResponse)
def create_alert(alert_in: AlertCreate, db: Session = Depends(get_db)):
    return AlertService.create_alert(db, alert_in)

@router.put("/{alert_id}/resolve", response_model=AlertResponse)
def resolve_alert(alert_id: int, db: Session = Depends(get_db)):
    return AlertService.resolve_alert(db, alert_id)
