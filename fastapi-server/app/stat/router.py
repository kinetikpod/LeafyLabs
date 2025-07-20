from fastapi import APIRouter, HTTPException, Depends
from app.stat.schemes import AnovaRequest, AnovaResponse, TtestRequest, StatResponse

# from app.stat.services import StatService
from app.stat.dependencies import get_stat_service

router = APIRouter(prefix="/stat", tags=["Statistic"])


@router.post("/twogroup", response_model=StatResponse, status_code=200)
def ttest(data: TtestRequest, stat_service=Depends(get_stat_service)):
    try:
        return stat_service.run_ttest(data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/multigroup", response_model=AnovaResponse, status_code=200)
def anova(data: AnovaRequest, stat_service=Depends(get_stat_service)):
    try:
        return stat_service.run_group_test(data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
