from sqlalchemy.orm import Session
from app.models.alert import Alert
from app.schemas.schemas import AlertCreate

class AlertService:
    @staticmethod
    def get_project_alerts(db: Session, project_id: int):
        return db.query(Alert).filter(Alert.project_id == project_id).order_by(Alert.created_at.desc()).all()

    @staticmethod
    def create_alert(db: Session, alert_in: AlertCreate) -> Alert:
        alert = Alert(**alert_in.model_dump())
        db.add(alert)
        db.commit()
        db.refresh(alert)
        return alert

    @staticmethod
    def resolve_alert(db: Session, alert_id: int) -> Alert:
        alert = db.query(Alert).filter(Alert.id == alert_id).first()
        if alert:
            alert.is_resolved = True
            db.commit()
            db.refresh(alert)
        return alert
