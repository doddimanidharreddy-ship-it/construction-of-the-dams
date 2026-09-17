from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any
from datetime import datetime

# --- Auth & User ---
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: Optional[str] = "engineer"

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    avatar: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# --- Project ---
class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    location: str
    status: Optional[str] = "In Progress"
    progress: Optional[float] = 0.0
    start_date: datetime
    end_date: datetime
    budget: float
    spent: Optional[float] = 0.0
    site_image_url: Optional[str] = None

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None
    progress: Optional[float] = None
    budget: Optional[float] = None
    spent: Optional[float] = None
    site_image_url: Optional[str] = None

class ProjectResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    location: str
    status: str
    progress: float
    start_date: datetime
    end_date: datetime
    budget: float
    spent: float
    site_image_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# --- Milestone ---
class MilestoneCreate(BaseModel):
    project_id: int
    title: str
    description: Optional[str] = None
    target_date: datetime
    status: Optional[str] = "Pending"
    progress: Optional[float] = 0.0

class MilestoneResponse(BaseModel):
    id: int
    project_id: int
    title: str
    description: Optional[str] = None
    target_date: datetime
    status: str
    progress: float

    class Config:
        from_attributes = True

# --- Progress ---
class ProgressCreate(BaseModel):
    project_id: int
    progress_pct: float
    notes: Optional[str] = None
    image_url: Optional[str] = None
    verified_by_cv: Optional[bool] = False

class ProgressResponse(BaseModel):
    id: int
    project_id: int
    date: datetime
    progress_pct: float
    notes: Optional[str] = None
    image_url: Optional[str] = None
    verified_by_cv: bool

    class Config:
        from_attributes = True

# --- Worker ---
class WorkerCreate(BaseModel):
    name: str
    role: str
    skill: Optional[str] = "Skilled"
    status: Optional[str] = "Active"
    project_id: Optional[int] = None
    phone: Optional[str] = None
    hourly_rate: Optional[float] = 25.0

class WorkerResponse(BaseModel):
    id: int
    name: str
    role: str
    skill: Optional[str]
    status: str
    project_id: Optional[int]
    phone: Optional[str]
    hourly_rate: float

    class Config:
        from_attributes = True

# --- Attendance ---
class AttendanceCreate(BaseModel):
    worker_id: int
    project_id: int
    date: Optional[datetime] = None
    status: str = "Present"
    hours_worked: float = 8.0

class AttendanceResponse(BaseModel):
    id: int
    worker_id: int
    project_id: int
    date: datetime
    status: str
    hours_worked: float

    class Config:
        from_attributes = True

# --- Equipment ---
class EquipmentCreate(BaseModel):
    name: str
    type: str
    serial_number: str
    project_id: Optional[int] = None
    status: Optional[str] = "Operational"
    fuel_level_pct: Optional[float] = 100.0
    hours_used: Optional[float] = 0.0

class EquipmentResponse(BaseModel):
    id: int
    name: str
    type: str
    serial_number: str
    project_id: Optional[int]
    status: str
    fuel_level_pct: float
    hours_used: float
    last_maintenance_date: Optional[datetime]

    class Config:
        from_attributes = True

# --- Maintenance ---
class MaintenanceCreate(BaseModel):
    equipment_id: int
    title: str
    date: Optional[datetime] = None
    cost: float = 0.0
    type: Optional[str] = "Routine"
    status: Optional[str] = "Scheduled"
    description: Optional[str] = None

class MaintenanceResponse(BaseModel):
    id: int
    equipment_id: int
    title: str
    date: datetime
    cost: float
    type: str
    status: str
    description: Optional[str]

    class Config:
        from_attributes = True

# --- Resource ---
class ResourceCreate(BaseModel):
    name: str
    type: str
    project_id: int
    current_stock: float
    unit: str
    unit_cost: float
    threshold_warning: Optional[float] = 10.0

class ResourceResponse(BaseModel):
    id: int
    name: str
    type: str
    project_id: int
    current_stock: float
    unit: str
    unit_cost: float
    threshold_warning: float

    class Config:
        from_attributes = True

# --- Consumption ---
class ConsumptionCreate(BaseModel):
    resource_id: int
    project_id: int
    quantity_used: float
    recorded_by: Optional[str] = None

class ConsumptionResponse(BaseModel):
    id: int
    resource_id: int
    project_id: int
    date: datetime
    quantity_used: float
    recorded_by: Optional[str]

    class Config:
        from_attributes = True

# --- Safety ---
class SafetyCreate(BaseModel):
    project_id: int
    incident_type: str
    severity: Optional[str] = "Low"
    description: str
    status: Optional[str] = "Open"
    zone: Optional[str] = None

class SafetyResponse(BaseModel):
    id: int
    project_id: int
    incident_type: str
    severity: str
    description: str
    status: str
    reported_at: datetime
    zone: Optional[str]

    class Config:
        from_attributes = True

# --- Alert ---
class AlertCreate(BaseModel):
    project_id: int
    title: str
    description: str
    severity: Optional[str] = "Medium"
    category: Optional[str] = "General"

class AlertResponse(BaseModel):
    id: int
    project_id: int
    title: str
    description: str
    severity: str
    category: str
    is_resolved: bool
    created_at: datetime

    class Config:
        from_attributes = True

# --- Prediction ---
class PredictionResponse(BaseModel):
    id: int
    project_id: int
    target_metric: str
    predicted_value: float
    actual_value: Optional[float]
    confidence: float
    features_used: Optional[str]
    model_version: str
    predicted_date: datetime

    class Config:
        from_attributes = True

# --- Risk ---
class RiskResponse(BaseModel):
    id: int
    project_id: int
    overall_score: float
    schedule_risk: float
    cost_risk: float
    safety_risk: float
    weather_risk: float
    top_risk_factors: Optional[str]
    updated_at: datetime

    class Config:
        from_attributes = True

# --- Site Zone ---
class SiteZoneCreate(BaseModel):
    project_id: int
    zone_name: str
    coordinates_json: Optional[str] = None
    status: Optional[str] = "Active"

class SiteZoneResponse(BaseModel):
    id: int
    project_id: int
    zone_name: str
    coordinates_json: Optional[str]
    status: str
    worker_count: int
    equipment_count: int
    active_alerts: int

    class Config:
        from_attributes = True

# --- Assistant Chat ---
class ChatRequest(BaseModel):
    message: str
    project_id: Optional[int] = None

class ChatResponse(BaseModel):
    reply: str
    suggested_actions: Optional[List[str]] = []
    data_context: Optional[dict] = None

# --- CV Detection Response ---
class DetectionResponse(BaseModel):
    ppe_violations: int
    workers_detected: int
    equipment_detected: int
    hard_hats: int
    safety_vests: int
    detected_objects: List[dict]
    annotated_image_url: Optional[str] = None
    processed_at: str
