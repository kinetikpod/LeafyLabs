from pydantic import BaseModel
from typing import List


class StatResponseBase(BaseModel):
    p_value: float
    test_type: str
    conclusion: str


class TtestResponse(StatResponseBase):
    t_stat: float


class AnovaResponse(StatResponseBase):
    f_stat: float


class TtestRequest(BaseModel):
    group1: List[float]
    group2: List[float]
    paired: bool = False


class AnovaRequest(BaseModel):
    groups: List[List[float]]
    repeated: bool = False


#
