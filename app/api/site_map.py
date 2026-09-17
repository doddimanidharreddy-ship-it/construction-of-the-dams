from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.schemas import SiteZoneResponse, SiteZoneCreate
from app.models.site_zone import SiteZone

router = APIRouter(prefix="/site-map", tags=["Site Map"])

@router.get("/zones/{project_id}", response_model=List[SiteZoneResponse])
def get_site_zones(project_id: int, db: Session = Depends(get_db)):
    zones = db.query(SiteZone).filter(SiteZone.project_id == project_id).all()
    return zones

@router.post("/zones", response_model=SiteZoneResponse)
def create_site_zone(zone_in: SiteZoneCreate, db: Session = Depends(get_db)):
    zone = SiteZone(**zone_in.model_dump())
    db.add(zone)
    db.commit()
    db.refresh(zone)
    return zone
