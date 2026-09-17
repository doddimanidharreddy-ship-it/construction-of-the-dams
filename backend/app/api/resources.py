from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.schemas import ResourceResponse, ResourceCreate, ConsumptionResponse, ConsumptionCreate
from app.models.resource import Resource
from app.models.consumption import Consumption

router = APIRouter(prefix="/resources", tags=["Resources"])

@router.get("", response_model=List[ResourceResponse])
def get_resources(project_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Resource)
    if project_id:
        query = query.filter(Resource.project_id == project_id)
    return query.all()

@router.post("", response_model=ResourceResponse)
def create_resource(res_in: ResourceCreate, db: Session = Depends(get_db)):
    res = Resource(**res_in.model_dump())
    db.add(res)
    db.commit()
    db.refresh(res)
    return res

@router.get("/consumption", response_model=List[ConsumptionResponse])
def get_consumption(project_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Consumption)
    if project_id:
        query = query.filter(Consumption.project_id == project_id)
    return query.order_by(Consumption.date.desc()).all()

@router.post("/consumption", response_model=ConsumptionResponse)
def record_consumption(con_in: ConsumptionCreate, db: Session = Depends(get_db)):
    con = Consumption(**con_in.model_dump())
    db.add(con)
    
    # Deduct stock from resource
    resource = db.query(Resource).filter(Resource.id == con_in.resource_id).first()
    if resource:
        resource.current_stock = max(0.0, resource.current_stock - con_in.quantity_used)
        
    db.commit()
    db.refresh(con)
    return con
