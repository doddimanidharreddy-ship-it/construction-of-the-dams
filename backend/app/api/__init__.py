from app.api.auth import router as auth_router
from app.api.dashboard import router as dashboard_router
from app.api.projects import router as projects_router
from app.api.progress import router as progress_router
from app.api.manpower import router as manpower_router
from app.api.equipment import router as equipment_router
from app.api.resources import router as resources_router
from app.api.safety import router as safety_router
from app.api.predictions import router as predictions_router
from app.api.risk import router as risk_router
from app.api.alerts import router as alerts_router
from app.api.reports import router as reports_router
from app.api.assistant import router as assistant_router
from app.api.site_map import router as site_map_router

__all__ = [
    "auth_router", "dashboard_router", "projects_router", "progress_router",
    "manpower_router", "equipment_router", "resources_router", "safety_router",
    "predictions_router", "risk_router", "alerts_router", "reports_router",
    "assistant_router", "site_map_router"
]
