from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from datetime import datetime, timezone
from app.database.connection import Base

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    target_metric = Column(String, nullable=False) # Delay_Days, Cost_Overrun, Safety_Risk
    predicted_value = Column(Float, nullable=False)
    actual_value = Column(Float, nullable=True)
    confidence = Column(Float, default=0.85)
    features_used = Column(Text, nullable=True) # JSON formatted string of features
    model_version = Column(String, default="v1.0.0")
    predicted_date = Column(DateTime, default=lambda: datetime.now(timezone.utc))
