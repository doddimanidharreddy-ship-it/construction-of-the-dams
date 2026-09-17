from sqlalchemy.orm import Session
from app.models.risk import Risk

class RiskService:
    @staticmethod
    def get_project_risk(db: Session, project_id: int):
        risk = db.query(Risk).filter(Risk.project_id == project_id).first()
        return risk

    @staticmethod
    def get_all_risks(db: Session):
        return db.query(Risk).all()
