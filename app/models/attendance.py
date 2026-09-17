from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from datetime import datetime, timezone
from app.database.connection import Base

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(Integer, ForeignKey("workers.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    date = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    status = Column(String, default="Present") # Present, Absent, Half-Day, Overtime
    hours_worked = Column(Float, default=8.0)
