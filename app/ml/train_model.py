import os
import joblib
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from app.ml.dataset_generator import generate_synthetic_construction_data

def train_and_save_models(model_dir=None):
    if model_dir is None:
        model_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "trained_models")
    os.makedirs(model_dir, exist_ok=True)
    
    df = generate_synthetic_construction_data()
    
    features = [
        "budget", "planned_duration_days", "num_workers",
        "equipment_count", "safety_incidents_count", "weather_delay_days",
        "resource_shortage_index", "change_orders_count"
    ]
    X = df[features]
    
    # 1. Delay Predictor Model
    y_delay = df["delay_days"]
    delay_model = RandomForestRegressor(n_estimators=100, random_state=42)
    delay_model.fit(X, y_delay)
    joblib.dump(delay_model, os.path.join(model_dir, "delay_model.joblib"))
    
    # 2. Cost Overrun Predictor Model
    y_cost = df["cost_overrun_pct"]
    cost_model = GradientBoostingRegressor(n_estimators=100, random_state=42)
    cost_model.fit(X, y_cost)
    joblib.dump(cost_model, os.path.join(model_dir, "cost_model.joblib"))
    
    # 3. Risk Score Predictor Model
    y_risk = df["overall_risk_score"]
    risk_model = RandomForestRegressor(n_estimators=100, random_state=42)
    risk_model.fit(X, y_risk)
    joblib.dump(risk_model, os.path.join(model_dir, "risk_model.joblib"))
    
    print(f"ML Models trained successfully and saved to {model_dir}")
    return True

if __name__ == "__main__":
    train_and_save_models()
