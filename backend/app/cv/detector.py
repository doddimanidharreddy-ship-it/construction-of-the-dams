import os
import random
from typing import Dict, List, Any

class SafetyDetector:
    def __init__(self):
        self.model_loaded = False
        try:
            from ultralytics import YOLO
            self.model_loaded = True
        except ImportError:
            self.model_loaded = False

    def detect_safety(self, image_bytes: bytes = None) -> Dict[str, Any]:
        detections = [
            {
                "label": "Worker with Helmet & Vest",
                "confidence": 0.94,
                "bbox": [120, 80, 240, 360],
                "status": "COMPLIANT",
                "color": "#10B981"
            },
            {
                "label": "Worker WITHOUT Helmet",
                "confidence": 0.89,
                "bbox": [310, 110, 420, 380],
                "status": "VIOLATION",
                "color": "#EF4444",
                "violation": "No Helmet Detected on active scaffolding"
            },
            {
                "label": "Heavy Excavator CAT-320",
                "confidence": 0.96,
                "bbox": [480, 150, 720, 450],
                "status": "ACTIVE_MACHINERY",
                "color": "#3B82F6"
            }
        ]

        return {
            "total_detected_objects": len(detections),
            "people_count": 2,
            "violations_count": 1,
            "safety_score": 88.5,
            "detections": detections,
            "alerts_generated": [
                {
                    "title": "Worker without Helmet Detected",
                    "priority": "HIGH",
                    "zone": "Scaffolding Sector B"
                }
            ],
            "demo_mode": True,
            "model_type": "YOLOv8 Construction Inspector (Demo Mode)"
        }

    def detect(self, image_path: str = None) -> Dict[str, Any]:
        return self.detect_safety()

safety_detector = SafetyDetector()
cv_detector = safety_detector
