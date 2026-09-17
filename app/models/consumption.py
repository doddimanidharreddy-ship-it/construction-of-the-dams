from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from datetime import datetime, timezone
from app.database.connection import Base

class Consumption(Base):
    __tablename__ = "resource_consumptions"

    id = Column(Integer, primary_key=True, index=True)
    resource_id = Column(Integer, ForeignKey("resources.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    date = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    quantity_used = Column(Float, nullable=False)
    recorded_by = Column(String, nullable=True)
