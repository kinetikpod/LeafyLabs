from fastapi import APIRouter, HTTPException, Depends
from app.stat.schema import AnovaRequest, AnovaResponse, TtestRequest, TtestResponse
from app.stat.dependencies import get_stat_service

router = APIRouter(prefix="/stat", tags=["Statistic"])


@router.get("/health")
def healthcheck():
    return {"status": "ok"}


@router.post("/twogroup", response_model=TtestResponse, status_code=200)
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


#
