# BuildVision AI — Real-Time Construction Project Intelligence Dashboard

**SIH Problem Statement SIH1295** | **Ministry of Power** | **Theme: Transportation & Logistics**

BuildVision AI is an enterprise-grade AI/ML & Computer Vision powered construction project monitoring and decision-support platform. It integrates real-time progress tracking, AI delay prediction, computer-vision safety enforcement, risk scoring, equipment & manpower tracking, and an interactive AI assistant.

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ & npm

### 1. Start Backend Server
```bash
cd backend
pip install -r requirements.txt
python seed.py
uvicorn app.main:app --reload --port 8000
```
Backend API interactive documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

### 2. Start Frontend Application
```bash
cd frontend
npm install
npm run dev
```
Frontend Web Dashboard: [http://localhost:5173](http://localhost:5173)

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@buildvision.ai` | `admin123` |
| **Project Manager** | `pm@buildvision.ai` | `pm123456` |
| **Site Engineer** | `engineer@buildvision.ai` | `eng123456` |
| **Supervisor** | `supervisor@buildvision.ai` | `sup123456` |

---

## 🌟 Main Modules & Features

1. **Executive Dashboard**: Real-time KPIs, Recharts analytics, recent alerts, AI insights banner.
2. **Projects Monitoring**: Comprehensive grid & detailed views with status indicators and search/filter.
3. **Planned vs Actual Progress**: Visual schedule variance, milestone timeline, estimated completion date.
4. **AI Delay Prediction**: ML model (Random Forest / Gradient Boosting) predicting delay probability & days with key risk factors.
5. **Construction Risk Score (0-100)**: Multi-dimensional risk gauge combining schedule, resource, equipment, safety, manpower risks.
6. **Manpower Monitoring**: Real-time worker counts, shift tracking, role distribution, productivity metrics.
7. **Equipment Monitoring**: Status tracking (Active, Idle, Maintenance), operating hours, maintenance alerts.
8. **Resource Tracking**: Real-time stock levels, consumption rates, automated reorder thresholds.
9. **AI Safety Vision**: Computer-Vision (YOLO + OpenCV) safety enforcement detecting PPE violations (helmets, vests, restricted zones).
10. **Centralized Alert Center**: Priority-sorted actionable alerts (Critical, High, Medium, Low) with recommended steps.
11. **Site Map View**: Interactive map showing construction zones, equipment pins, restricted areas, alert hotspots.
12. **AI Assistant**: Natural language query interface powered by database analytics and intelligence rules.
13. **Reports Generator**: Exportable summaries for management and auditing.
14. **Settings & Role Control**: Access management and API/IoT configurations.

---

## 🏗 System Architecture

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Recharts, Lucide Icons
- **Backend**: Python 3.11+, FastAPI, SQLAlchemy, SQLite/PostgreSQL
- **AI/ML**: Scikit-Learn (Random Forest, Gradient Boosting), Pandas, NumPy
- **Computer Vision**: OpenCV, Ultralytics YOLOv8
- **Authentication**: JWT tokens with Role-Based Access Control (RBAC)

---

> **Note**: System operates in **DEMO MODE — SIMULATED DATA** for hackathon demonstration. Physical IoT/GPS sensors can be plugged into the provided API endpoints seamlessly.
