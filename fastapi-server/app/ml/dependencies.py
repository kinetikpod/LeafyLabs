from app.ml.services import MedicalModelService

# Buat satu instance global
medical_service = MedicalModelService()

def get_medical_service() -> MedicalModelService:
    """Dependency FastAPI yang mengembalikan instance tunggal yang sudah dimuat."""
    return medical_service

