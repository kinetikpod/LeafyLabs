from pydantic import BaseModel, Field, field_validator
from typing import Literal, Dict, ClassVar


class PredictionInput(BaseModel):
    age: float
    sex: Literal["male", "female"]
    chest_pain_type: Literal[
        "typical angina", "atypical angina", "non-anginal pain", "asymptomatic"
    ] = Field(..., alias="chestPainType")
    resting_blood_pressure: float = Field(..., alias="restingBloodPressure")
    cholesterol: float
    fasting_blood_sugar: Literal["<=120mg/dl", ">120mg/dl"] = Field(
        ..., alias="fastingBloodSugar"
    )
    resting_ecg: Literal[
        "normal", "ST-T wave abnormality", "left ventricular hypertrophy"
    ] = Field(..., alias="restingEcg")
    max_heart_rate: float = Field(..., alias="maxHeartRate")
    exercise_induced_angina: Literal["no", "yes"] = Field(
        ..., alias="exerciseInducedAngina"
    )
    st_depression: float = Field(..., alias="stDepression")
    st_slope: Literal["upsloping", "flat", "downsloping"] = Field(..., alias="stSlope")
    num_major_vessels: int = Field(..., alias="numMajorVessels")
    thalassemia: Literal["normal", "fixed defect", "reversible defect"]

    # kamus mapping persis seperti data training
    _maps: ClassVar[Dict[str, Dict[str, int]]] = {
        "sex": {"male": 1, "female": 0},
        "chest_pain_type": {
            "typical angina": 0,
            "atypical angina": 1,
            "non-anginal pain": 2,
            "asymptomatic": 3,
        },
        "fasting_blood_sugar": {"<=120mg/dl": 0, ">120mg/dl": 1},
        "resting_ecg": {
            "normal": 0,
            "ST-T wave abnormality": 1,
            "left ventricular hypertrophy": 2,
        },
        "exercise_induced_angina": {"no": 0, "yes": 1},
        "st_slope": {"upsloping": 0, "flat": 1, "downsloping": 2},
        "thalassemia": {"normal": 1, "fixed defect": 2, "reversible defect": 3},
    }

    @field_validator(
        "sex",
        "chest_pain_type",
        "fasting_blood_sugar",
        "resting_ecg",
        "exercise_induced_angina",
        "st_slope",
        "thalassemia",
        mode="after",
    )
    def _map_to_code(cls, v, info):
        """
        info.field_name → nama field (misal "sex")
        v               → nilai mentah dari JSON (misal "male")
        """
        mapping = cls._maps[info.field_name]
        if v not in mapping:
            raise ValueError(f"Invalid value {v!r} for {info.field_name}")
        return mapping[v]

    model_config = dict(
        populate_by_name=True  # type: ignore
    )


class PredictionOutput(BaseModel):
    prediction: int
    probability: float
    shap_plot_base64: str
