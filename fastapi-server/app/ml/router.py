from fastapi import APIRouter, Depends
from app.ml.schemes import PredictionInput, PredictionOutput
from app.ml.services import MedicalModelService
from app.ml.dependencies import get_medical_service
import os


router = APIRouter(prefix="/ml", tags=["MachineLearning"])


# @router.get("/_debug_env")
# def debug_env():
#     # Endpoint ini akan muncul kalau server sudah berhasil start
#     return {
#         "DATABASE_URL": os.getenv("DATABASE_URL"),
#         "ALL_ENV": dict(os.environ),
#     }


@router.get("/health")
def health_check():
    return {"status": "ok"}


@router.post("/prediction", response_model=PredictionOutput, status_code=200)
def prediction_endpoint(
    input: PredictionInput, service: MedicalModelService = Depends(get_medical_service)
) -> PredictionOutput:
    return service.predict(input)
