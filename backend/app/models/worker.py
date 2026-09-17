from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database.connection import Base

class Worker(Base):
    __tablename__ = "workers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False) # Mason, Carpenter, Electrician, Crane Operator, General Laborer
    skill = Column(String, nullable=True) # Skilled, Semi-Skilled, Expert
    status = Column(String, default="Active") # Active, On Leave, Inactive
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    phone = Column(String, nullable=True)
    hourly_rate = Column(Float, default=25.0)
