from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database.connection import Base

class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False) # Cement, Steel Rebar, Concrete, Bricks, Fuel, Sand
    type = Column(String, nullable=False) # Raw Material, Fuel, Consumable, Structural
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    current_stock = Column(Float, default=0.0)
    unit = Column(String, nullable=False) # tons, bags, liters, cubic meters
    unit_cost = Column(Float, default=0.0)
    threshold_warning = Column(Float, default=10.0)
