from app.cv.detector import cv_detector

class CVService:
    @staticmethod
    def process_site_camera_feed(image_bytes: bytes):
        results = cv_detector.analyze_image(image_bytes)
        return results
