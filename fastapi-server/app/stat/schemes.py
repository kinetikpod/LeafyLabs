from pydantic import BaseModel
from typing import List


class TtestRequest(BaseModel):
    group1: List[float]
    group2: List[float]
    paired: bool = False


class StatResponse(BaseModel):
    stat: float
    p_value: float
    test_type: str
    conclusion: str


class AnovaRequest(BaseModel):
    groups: List[List[float]]
    repeated: bool


class AnovaResponse(BaseModel):
    stat: float
    p_value: float
    test_type: str = "One-way ANOVA"
    conclusion: str
