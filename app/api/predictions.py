from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.schemas import PredictionResponse
from app.models.prediction import Prediction
from app.services.ml_service import MLService

router = APIRouter(prefix="/predictions", tags=["Predictions"])

@router.get("/{project_id}")
def get_project_predictions(project_id: int, db: Session = Depends(get_db)):
    return MLService.run_project_predictions(db, project_id)

@router.post("/{project_id}/run")
def trigger_ml_prediction(project_id: int, db: Session = Depends(get_db)):
    return MLService.run_project_predictions(db, project_id)
