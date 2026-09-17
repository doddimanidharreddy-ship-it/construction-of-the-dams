from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.database.connection import engine, Base
import app.models # Register all models with Base
from app.ml.train_model import train_and_save_models

from app.api.api import router as main_api_router
from app.api import (
    auth_router,
    dashboard_router,
    projects_router,
    progress_router,
    manpower_router,
    equipment_router,
    resources_router,
    safety_router,
    predictions_router,
    risk_router,
    alerts_router,
    reports_router,
    assistant_router,
    site_map_router
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="BuildVision AI - Enterprise Construction Management & Computer Vision Intelligence API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS + ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    # 1. Create database tables
    Base.metadata.create_all(bind=engine)
    # 2. Ensure ML models are trained and saved
    try:
        train_and_save_models()
    except Exception as e:
        print(f"Warning: ML model initialization encountered an error: {e}")

# Include main router for /api
app.include_router(main_api_router, prefix="/api")

# Include all API routers under API V1
v1_prefix = settings.API_V1_STR

app.include_router(auth_router, prefix=v1_prefix)
app.include_router(dashboard_router, prefix=v1_prefix)
app.include_router(projects_router, prefix=v1_prefix)
app.include_router(progress_router, prefix=v1_prefix)
app.include_router(manpower_router, prefix=v1_prefix)
app.include_router(equipment_router, prefix=v1_prefix)
app.include_router(resources_router, prefix=v1_prefix)
app.include_router(safety_router, prefix=v1_prefix)
app.include_router(predictions_router, prefix=v1_prefix)
app.include_router(risk_router, prefix=v1_prefix)
app.include_router(alerts_router, prefix=v1_prefix)
app.include_router(reports_router, prefix=v1_prefix)
app.include_router(assistant_router, prefix=v1_prefix)
app.include_router(site_map_router, prefix=v1_prefix)

@app.get("/")
def root():
    return {
        "message": "Welcome to BuildVision AI Backend API",
        "docs": "/docs",
        "version": "1.0.0",
        "status": "Operational"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
