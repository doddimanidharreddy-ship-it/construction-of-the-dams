from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.schemas import RiskResponse
from app.services.risk_service import RiskService

router = APIRouter(prefix="/risk", tags=["Risk"])

@router.get("", response_model=List[RiskResponse])
def get_all_risks(db: Session = Depends(get_db)):
    return RiskService.get_all_risks(db)

@router.get("/{project_id}", response_model=RiskResponse)
def get_project_risk(project_id: int, db: Session = Depends(get_db)):
    return RiskService.get_project_risk(db, project_id)
