from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.schemas import SafetyResponse, SafetyCreate, DetectionResponse
from app.models.safety import Safety
from app.services.cv_service import CVService

router = APIRouter(prefix="/safety", tags=["Safety"])

@router.get("", response_model=List[SafetyResponse])
def get_safety_incidents(project_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Safety)
    if project_id:
        query = query.filter(Safety.project_id == project_id)
    return query.order_by(Safety.reported_at.desc()).all()

@router.post("", response_model=SafetyResponse)
def report_safety_incident(inc_in: SafetyCreate, db: Session = Depends(get_db)):
    inc = Safety(**inc_in.model_dump())
    db.add(inc)
    db.commit()
    db.refresh(inc)
    return inc

@router.post("/detect-cv", response_model=DetectionResponse)
async def analyze_safety_feed(file: UploadFile = File(...)):
    contents = await file.read()
    return CVService.process_site_camera_feed(contents)
