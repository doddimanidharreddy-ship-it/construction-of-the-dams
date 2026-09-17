import os
import joblib
import pandas as pd
import numpy as np
from app.ml.train_model import train_and_save_models

class BuildVisionPredictor:
    def __init__(self):
        self.model_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "trained_models")
        self.delay_model = None
        self.cost_model = None
        self.risk_model = None
        self._ensure_models()

    def _ensure_models(self):
        delay_path = os.path.join(self.model_dir, "delay_model.joblib")
        cost_path = os.path.join(self.model_dir, "cost_model.joblib")
        risk_path = os.path.join(self.model_dir, "risk_model.joblib")
        
        if not (os.path.exists(delay_path) and os.path.exists(cost_path) and os.path.exists(risk_path)):
            print("Trained models not found. Training now...")
            train_and_save_models(self.model_dir)
            
        self.delay_model = joblib.load(delay_path)
        self.cost_model = joblib.load(cost_path)
        self.risk_model = joblib.load(risk_path)

    def predict_project_metrics(self, project_features: dict) -> dict:
        features_df = pd.DataFrame([{
            "budget": project_features.get("budget", 5000000.0),
            "planned_duration_days": project_features.get("planned_duration_days", 365.0),
            "num_workers": project_features.get("num_workers", 50),
            "equipment_count": project_features.get("equipment_count", 10),
            "safety_incidents_count": project_features.get("safety_incidents_count", 2),
            "weather_delay_days": project_features.get("weather_delay_days", 5.0),
            "resource_shortage_index": project_features.get("resource_shortage_index", 0.2),
            "change_orders_count": project_features.get("change_orders_count", 3)
        }])
        
        predicted_delay = float(self.delay_model.predict(features_df)[0])
        predicted_cost_overrun = float(self.cost_model.predict(features_df)[0])
        predicted_risk = float(self.risk_model.predict(features_df)[0])
        
        return {
            "predicted_delay_days": round(predicted_delay, 1),
            "predicted_cost_overrun_pct": round(predicted_cost_overrun, 1),
            "predicted_risk_score": round(predicted_risk, 1),
            "confidence": 0.88
        }

predictor = BuildVisionPredictor()
