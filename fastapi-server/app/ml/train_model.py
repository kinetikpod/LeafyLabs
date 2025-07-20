import pandas as pd
import joblib
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.metrics import classification_report
from pathlib import Path
from sklearn.ensemble import RandomForestClassifier
from core.logger import logger
from app.ml.binary_encoder import BinaryLabelEncoder


def train_and_save():
    logger.debug("📥 Loading CSV data...")
    csv_path = Path(__file__).resolve().parent / "heart.csv"
    data = pd.read_csv(csv_path)
    logger.debug(f"✅ Loaded data shape: {data.shape}")

    logger.debug("🧹 Cleaning data...")
    data = data[(data["ca"] < 4) & (data["thal"] > 0)]
    logger.debug(f"✅ Cleaned data shape: {data.shape}")

    logger.debug("✏️ Renaming columns...")
    data = data.rename(  # type: ignore
        columns={
            "cp": "chest_pain_type",
            "trestbps": "resting_blood_pressure",
            "chol": "cholesterol",
            "fbs": "fasting_blood_sugar",
            "restecg": "resting_ecg",
            "thalach": "max_heart_rate",
            "exang": "exercise_induced_angina",
            "oldpeak": "st_depression",
            "slope": "st_slope",
            "ca": "num_major_vessels",
            "thal": "thalassemia",
            "target": "label",
        }
    )

    logger.debug("📊 Splitting features and label...")
    X = data.drop(columns="label")
    y = data["label"]

    categorical_cols = [
        "sex",
        "chest_pain_type",
        "fasting_blood_sugar",
        "resting_ecg",
        "exercise_induced_angina",
        "st_slope",
        "thalassemia",
    ]
    binary_cols = ["sex", "fasting_blood_sugar", "exercise_induced_angina"]
    ohe_cols = [c for c in categorical_cols if c not in binary_cols]
    numeric_cols = [c for c in X.columns if c not in binary_cols + ohe_cols]

    logger.debug(f"🔍 Categorical cols: {categorical_cols}")
    logger.debug(f"🔍 Binary cols: {binary_cols}")
    logger.debug(f"🔍 OHE cols: {ohe_cols}")
    logger.debug(f"🔍 Numeric cols: {numeric_cols}")

    logger.debug("🛠️ Building pipeline...")
    preprocessor = ColumnTransformer(
        transformers=[
            ("bin", BinaryLabelEncoder(), binary_cols),
            ("ohe", OneHotEncoder(sparse_output=False, drop="first"), ohe_cols),
            ("num", "passthrough", numeric_cols),
        ]
    )

    pipeline = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("classifier", RandomForestClassifier(random_state=2025)),
        ]
    )

    param_grid = {
        "classifier__n_estimators": [50, 100, 200],
        "classifier__max_depth": [None, 5, 10],
        "classifier__min_samples_split": [2, 5],
    }

    logger.debug("📚 Setting up GridSearchCV...")
    search = GridSearchCV(
        pipeline,
        param_grid,
        cv=5,
        scoring="accuracy",
        n_jobs=1,
    )

    logger.debug("🔀 Splitting train/test...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.25, random_state=42, stratify=y
    )
    logger.debug(f"✅ Train shape: {X_train.shape}, Test shape: {X_test.shape}")  # type: ignore

    logger.debug("🏋️ Training model...")
    search.fit(X_train, y_train)
    best_pipeline = search.best_estimator_
    logger.debug(f"✅ Best params: {search.best_params_}")

    logger.debug("🔎 Evaluating...")
    y_pred = best_pipeline.predict(X_test)
    y_proba = best_pipeline.predict_proba(X_test)[:, 1]

    logger.debug(f"🔍 Sample #5 input:\n{X_test.iloc[4]}")  # type: ignore
    logger.debug(f"✅ Predicted class: {best_pipeline.predict(X_test.iloc[[4]])}")  # type: ignore

    logger.debug(f"✅ First 5 predictions: {y_pred[:5]}")
    logger.debug(f"✅ First 5 probabilities: {y_proba[:5]}")

    logger.debug(f"📄 Classification report:\n{classification_report(y_test, y_pred)}")

    logger.debug("💾 Saving artifacts...")
    MODEL_PATH = "./app/ml/medical_pipeline.pkl"
    FEATURES_PATH = "./app/ml/features.pkl"
    BG_PATH = "./app/ml/background.pkl"

    joblib.dump(best_pipeline, MODEL_PATH)
    logger.debug(f"✅ Saved model to: {MODEL_PATH}")

    feature_names = (
        best_pipeline.named_steps["preprocessor"].get_feature_names_out().tolist()
    )
    joblib.dump(feature_names, FEATURES_PATH)
    logger.debug(f"✅ Saved feature names to: {FEATURES_PATH}")

    background_raw = X_train.sample(n=100, random_state=2025)  # type: ignore
    joblib.dump(background_raw, BG_PATH)
    logger.debug(f"✅ Saved background sample to: {BG_PATH}")


if __name__ == "__main__":
    train_and_save()
