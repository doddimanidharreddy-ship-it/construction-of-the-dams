import numpy as np
import pandas as pd

def generate_synthetic_construction_data(n_samples=500, random_state=42):
    np.random.seed(random_state)
    
    budget = np.random.uniform(500000, 50000000, n_samples)
    planned_duration_days = np.random.uniform(90, 730, n_samples)
    num_workers = np.random.randint(10, 300, n_samples)
    equipment_count = np.random.randint(2, 50, n_samples)
    safety_incidents_count = np.random.randint(0, 15, n_samples)
    weather_delay_days = np.random.uniform(0, 30, n_samples)
    resource_shortage_index = np.random.uniform(0.0, 1.0, n_samples) # 0 = no shortage, 1 = severe
    change_orders_count = np.random.randint(0, 20, n_samples)
    
    # Calculate synthetic targets
    delay_days = (
        0.15 * weather_delay_days +
        20.0 * resource_shortage_index +
        3.5 * change_orders_count +
        1.2 * safety_incidents_count +
        np.random.normal(0, 5, n_samples)
    )
    delay_days = np.maximum(0, delay_days)
    
    cost_overrun_pct = (
        0.02 * delay_days +
        1.5 * change_orders_count +
        15.0 * resource_shortage_index +
        np.random.normal(0, 3, n_samples)
    )
    cost_overrun_pct = np.maximum(0, cost_overrun_pct)
    
    overall_risk_score = np.clip(
        (delay_days * 0.8) + (cost_overrun_pct * 1.2) + (safety_incidents_count * 3.0),
        5.0, 95.0
    )
    
    df = pd.DataFrame({
        "budget": budget,
        "planned_duration_days": planned_duration_days,
        "num_workers": num_workers,
        "equipment_count": equipment_count,
        "safety_incidents_count": safety_incidents_count,
        "weather_delay_days": weather_delay_days,
        "resource_shortage_index": resource_shortage_index,
        "change_orders_count": change_orders_count,
        "delay_days": delay_days,
        "cost_overrun_pct": cost_overrun_pct,
        "overall_risk_score": overall_risk_score
    })
    
    return df

if __name__ == "__main__":
    df = generate_synthetic_construction_data()
    print("Generated synthetic dataset shape:", df.shape)
