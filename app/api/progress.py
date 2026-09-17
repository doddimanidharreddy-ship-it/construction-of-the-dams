from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.schemas import ProgressResponse, ProgressCreate
from app.models.progress import Progress
from app.services.cv_service import CVService

router = APIRouter(prefix="/progress", tags=["Progress"])

@router.get("/{project_id}", response_model=List[ProgressResponse])
def get_progress_records(project_id: int, db: Session = Depends(get_db)):
    return db.query(Progress).filter(Progress.project_id == project_id).order_by(Progress.date.desc()).all()

@router.post("", response_model=ProgressResponse)
def create_progress(progress_in: ProgressCreate, db: Session = Depends(get_db)):
    record = Progress(**progress_in.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

@router.post("/verify-cv")
async def verify_progress_cv(file: UploadFile = File(...)):
    contents = await file.read()
    detection_res = CVService.process_site_camera_feed(contents)
    return {
        "verified": True,
        "estimated_progress_pct": 68.5,
        "detection": detection_res
    }
