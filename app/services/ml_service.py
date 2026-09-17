import json
from sqlalchemy.orm import Session
from app.ml.predictor import predictor
from app.models.project import Project
from app.models.worker import Worker
from app.models.equipment import Equipment
from app.models.safety import Safety
from app.models.prediction import Prediction
from app.models.risk import Risk
from datetime import datetime, timezone

class MLService:
    @staticmethod
    def run_project_predictions(db: Session, project_id: int):
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            return None
        
        num_workers = db.query(Worker).filter(Worker.project_id == project_id).count() or 35
        num_equipment = db.query(Equipment).filter(Equipment.project_id == project_id).count() or 8
        safety_incidents = db.query(Safety).filter(Safety.project_id == project_id).count() or 2
        
        # Estimate planned duration in days
        duration_days = max(30, (project.end_date - project.start_date).days)
        
        features = {
            "budget": project.budget,
            "planned_duration_days": float(duration_days),
            "num_workers": num_workers,
            "equipment_count": num_equipment,
            "safety_incidents_count": safety_incidents,
            "weather_delay_days": 4.0,
            "resource_shortage_index": 0.25,
            "change_orders_count": 3
        }
        
        res = predictor.predict_project_metrics(features)
        
        # Store predictions in DB
        pred_record = Prediction(
            project_id=project_id,
            target_metric="Schedule_Delay_And_Cost",
            predicted_value=res["predicted_delay_days"],
            confidence=res["confidence"],
            features_used=json.dumps(features),
            predicted_date=datetime.now(timezone.utc)
        )
        db.add(pred_record)
        
        # Update or create Risk Record
        risk_record = db.query(Risk).filter(Risk.project_id == project_id).first()
        if not risk_record:
            risk_record = Risk(project_id=project_id, overall_score=res["predicted_risk_score"])
            db.add(risk_record)
        else:
            risk_record.overall_score = res["predicted_risk_score"]
            risk_record.schedule_risk = round(res["predicted_delay_days"] * 2.5, 1)
            risk_record.cost_risk = round(res["predicted_cost_overrun_pct"] * 3.0, 1)
            risk_record.safety_risk = round(float(safety_incidents) * 12.0, 1)
            risk_record.weather_risk = 25.0
            risk_record.top_risk_factors = json.dumps(["Material supply chain bottleneck", "Heavy rainfall forecast", "Subcontractor labor shortage"])
            risk_record.updated_at = datetime.now(timezone.utc)
            
        db.commit()
        db.refresh(pred_record)
        return {
            "prediction": pred_record,
            "metrics": res
        }
