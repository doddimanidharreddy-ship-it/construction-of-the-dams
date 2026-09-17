from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.schemas import EquipmentResponse, EquipmentCreate, MaintenanceResponse, MaintenanceCreate
from app.models.equipment import Equipment
from app.models.maintenance import Maintenance

router = APIRouter(prefix="/equipment", tags=["Equipment"])

@router.get("", response_model=List[EquipmentResponse])
def get_equipment(project_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Equipment)
    if project_id:
        query = query.filter(Equipment.project_id == project_id)
    return query.all()

@router.post("", response_model=EquipmentResponse)
def create_equipment(eq_in: EquipmentCreate, db: Session = Depends(get_db)):
    eq = Equipment(**eq_in.model_dump())
    db.add(eq)
    db.commit()
    db.refresh(eq)
    return eq

@router.get("/maintenance", response_model=List[MaintenanceResponse])
def get_maintenance(db: Session = Depends(get_db)):
    return db.query(Maintenance).order_by(Maintenance.date.desc()).all()

@router.post("/maintenance", response_model=MaintenanceResponse)
def create_maintenance(m_in: MaintenanceCreate, db: Session = Depends(get_db)):
    m = Maintenance(**m_in.model_dump())
    db.add(m)
    db.commit()
    db.refresh(m)
    return m
