from pathlib import Path
from typing import Optional
import joblib
import pandas as pd
from sklearn.pipeline import Pipeline


class ModelLoader:
    def __init__(self):
        self.pipeline: Optional[Pipeline] = None
        self.feature_names: Optional[list[str]] = None
        self.background: Optional[pd.DataFrame] = None

    def load(self) -> None:
        base = Path(__file__).resolve().parent

        # Load model
        pkl = base / "medical_pipeline.pkl"
        if not pkl.exists():
            raise FileNotFoundError(f"Missing {pkl}")
        self.pipeline = joblib.load(pkl)

        # Load feature names
        fn = base / "features.pkl"
        if not fn.exists():
            raise FileNotFoundError(f"Missing {fn}")
        self.feature_names = joblib.load(fn)

        # Load background data for SHAP
        bg = base / "background.pkl"
        if not bg.exists():
            raise FileNotFoundError(f"Missing {bg}")
        self.background = joblib.load(bg)
