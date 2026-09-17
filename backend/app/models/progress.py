from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean
from datetime import datetime, timezone
from app.database.connection import Base

class Progress(Base):
    __tablename__ = "progress_records"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    date = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    progress_pct = Column(Float, nullable=False)
    notes = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    verified_by_cv = Column(Boolean, default=False)
