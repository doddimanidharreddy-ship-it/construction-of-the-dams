from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from datetime import datetime, timezone
from app.database.connection import Base

class Safety(Base):
    __tablename__ = "safety_incidents"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    incident_type = Column(String, nullable=False) # PPE Violation, Near Miss, Equipment Failure, Minor Injury, Fall Hazard
    severity = Column(String, default="Low") # Low, Medium, High, Critical
    description = Column(Text, nullable=False)
    status = Column(String, default="Open") # Open, Under Investigation, Resolved, Dismissed
    reported_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    zone = Column(String, nullable=True)
