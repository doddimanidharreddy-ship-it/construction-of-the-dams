from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.schemas import WorkerResponse, WorkerCreate, AttendanceResponse, AttendanceCreate
from app.models.worker import Worker
from app.models.attendance import Attendance

router = APIRouter(prefix="/manpower", tags=["Manpower"])

@router.get("/workers", response_model=List[WorkerResponse])
def get_workers(project_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Worker)
    if project_id:
        query = query.filter(Worker.project_id == project_id)
    return query.all()

@router.post("/workers", response_model=WorkerResponse)
def create_worker(worker_in: WorkerCreate, db: Session = Depends(get_db)):
    worker = Worker(**worker_in.model_dump())
    db.add(worker)
    db.commit()
    db.refresh(worker)
    return worker

@router.get("/attendance", response_model=List[AttendanceResponse])
def get_attendance(project_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Attendance)
    if project_id:
        query = query.filter(Attendance.project_id == project_id)
    return query.order_by(Attendance.date.desc()).all()

@router.post("/attendance", response_model=AttendanceResponse)
def record_attendance(att_in: AttendanceCreate, db: Session = Depends(get_db)):
    att = Attendance(**att_in.model_dump())
    db.add(att)
    db.commit()
    db.refresh(att)
    return att
