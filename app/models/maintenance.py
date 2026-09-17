from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from datetime import datetime, timezone
from app.database.connection import Base

class Maintenance(Base):
    __tablename__ = "maintenance_records"

    id = Column(Integer, primary_key=True, index=True)
    equipment_id = Column(Integer, ForeignKey("equipment.id"), nullable=False)
    title = Column(String, nullable=False)
    date = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    cost = Column(Float, default=0.0)
    type = Column(String, default="Routine") # Routine, Emergency, Preventive, Overhaul
    status = Column(String, default="Scheduled") # Scheduled, In Progress, Completed
    description = Column(Text, nullable=True)
