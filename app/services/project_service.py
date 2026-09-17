from sqlalchemy.orm import Session
from app.models.project import Project
from app.models.milestone import Milestone
from app.models.progress import Progress
from app.schemas.schemas import ProjectCreate, ProjectUpdate
from fastapi import HTTPException

class ProjectService:
    @staticmethod
    def get_all_projects(db: Session):
        return db.query(Project).all()

    @staticmethod
    def get_project_by_id(db: Session, project_id: int) -> Project:
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            raise HTTPException(status_code=404, detail=f"Project with ID {project_id} not found")
        return project

    @staticmethod
    def create_project(db: Session, project_in: ProjectCreate) -> Project:
        project = Project(**project_in.model_dump())
        db.add(project)
        db.commit()
        db.refresh(project)
        return project

    @staticmethod
    def update_project(db: Session, project_id: int, project_in: ProjectUpdate) -> Project:
        project = ProjectService.get_project_by_id(db, project_id)
        update_data = project_in.model_dump(exclude_unset=True)
        for key, val in update_data.items():
            setattr(project, key, val)
        db.commit()
        db.refresh(project)
        return project

    @staticmethod
    def delete_project(db: Session, project_id: int):
        project = ProjectService.get_project_by_id(db, project_id)
        db.delete(project)
        db.commit()
        return {"detail": "Project deleted successfully"}
