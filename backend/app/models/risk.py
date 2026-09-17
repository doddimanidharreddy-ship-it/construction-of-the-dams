from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from datetime import datetime, timezone
from app.database.connection import Base

class Risk(Base):
    __tablename__ = "risk_scores"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    overall_score = Column(Float, nullable=False) # 0 to 100
    schedule_risk = Column(Float, default=0.0)
    cost_risk = Column(Float, default=0.0)
    safety_risk = Column(Float, default=0.0)
    weather_risk = Column(Float, default=0.0)
    top_risk_factors = Column(Text, nullable=True) # JSON list or string
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
