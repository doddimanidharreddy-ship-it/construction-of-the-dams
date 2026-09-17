# BuildVision AI — System Architecture & Design Documentation

## Overview
BuildVision AI is designed as a modular, enterprise-grade construction intelligence platform.

```
[ Frontend: React + Vite + Tailwind ]
               |
        REST API (JWT Auth)
               |
[ Backend: FastAPI + SQLAlchemy ] <---> [ ML Engine: Scikit-learn Delay Predictor ]
               |                  <---> [ CV Engine: OpenCV + YOLO Safety Inspector ]
               v
[ SQLite / PostgreSQL Database ]
```

## Data Models & Database Schema
- **User**: Authentication, RBAC (Admin, Project Manager, Site Engineer, Supervisor)
- **Project**: Core entity with progress, budget, risk, safety, location metrics
- **Milestone**: Project milestones and schedule compliance
- **ProgressRecord**: Historical tracking of planned vs actual progress
- **Worker**: Manpower allocation, roles, attendance, shift data
- **Equipment**: Heavy equipment status, utilization, maintenance schedules
- **Resource**: Raw materials stock, reorder levels, consumption rate
- **Alert**: Actionable system notifications prioritized by severity
- **SafetyIncident**: Automated and reported site safety events
- **Prediction**: Machine Learning output records detailing delay risks
- **RiskScore**: Comprehensive 0-100 score breakdown across 5 dimensions

## AI & ML Architecture
- **Delay Prediction**: Trained ensemble classifier predicting delay probability (%) and regressor predicting delay days based on 10+ operational parameters.
- **Explainable AI**: Derives top contributing delay factors (e.g., manpower shortage, equipment downtime, stock outage) and generates actionable recommendations.

## Computer Vision Pipeline
- OpenCV frames processed through YOLOv8.
- Detects workers, machinery, and zone violations.
- Calculates safety score (0-100) and triggers high-priority alerts on non-compliance.
