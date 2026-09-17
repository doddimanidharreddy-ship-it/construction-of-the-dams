from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from datetime import datetime, timezone
from app.database.connection import Base

class SiteZone(Base):
    __tablename__ = "site_zones"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    zone_name = Column(String, nullable=False)
    coordinates_json = Column(Text, nullable=True) # JSON coordinates for map layout
    status = Column(String, default="Active") # Active, Restricted, Danger, Completed
    worker_count = Column(Integer, default=0)
    equipment_count = Column(Integer, default=0)
    active_alerts = Column(Integer, default=0)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
