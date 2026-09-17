from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from datetime import datetime, timezone
from app.database.connection import Base

class Equipment(Base):
    __tablename__ = "equipment"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False) # Excavator, Tower Crane, Concrete Mixer, Bulldozer, Dump Truck
    serial_number = Column(String, unique=True, nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    status = Column(String, default="Operational") # Operational, Maintenance Required, Out of Service, Idle
    fuel_level_pct = Column(Float, default=100.0)
    hours_used = Column(Float, default=0.0)
    last_maintenance_date = Column(DateTime, nullable=True)
