from app.ml.load_model import ModelLoader
from app.ml.schemes import PredictionInput, PredictionOutput
import pandas as pd
from app.ml.utils import waterfall_plot_base64
import shap
from core.logger import logger

# import ini hanya untuk mengatasi error pkl
from app.ml.binary_encoder import BinaryLabelEncoder


class MedicalModelService:
    def __init__(self):
        self.loader = ModelLoader()
        self.explainer = None

    def load_model(self):
        # 1. Load pipeline and background raw DataFrame
        self.loader.load()
        pipeline = self.loader.pipeline
        bg_df = self.loader.background

        if pipeline is None or bg_df is None:
            logger.error(
                "🚨 Failed to load model or SHAP background data. pipeline=%s, bg_df=%s",
                pipeline,
                bg_df,
            )
            raise RuntimeError("Failed to load model or SHAP background data.")

        # 2. Split pipeline into preprocessor + classifier
        preprocessor = pipeline.named_steps["preprocessor"]
        tree_model = pipeline.named_steps["classifier"]

        # 3. Preprocess the background for SHAP, we need to turn bg_df into bg_transformed coz bg_df is raw (data mentah) that we get before preprcossing (when train_test_split) while classifier only sees the preprocessed by pipeline
        bg_transformed = preprocessor.transform(bg_df)

        # 4. Initialize the explainer on the raw tree model
        self.explainer = shap.Explainer(tree_model.predict_proba, bg_transformed)

    def predict(self, payload: PredictionInput) -> PredictionOutput:
        if self.loader.pipeline is None or self.explainer is None:
            logger.error(
                "🚨 Model or SHAP explainer is not loaded: pipeline=%s, explainer=%s",
                self.loader.pipeline,
                self.explainer,
            )
            raise RuntimeError("Model or SHAP explainer is not loaded")

        # 1. Convert raw payload to DataFrame
        df_raw = pd.DataFrame([payload.model_dump()])

        # 2. Preprocess input to numpy matrix
        preprocessor = self.loader.pipeline.named_steps["preprocessor"]
        arr_transformed = preprocessor.transform(df_raw)

        # 3. Wrap transformed array with feature names as DataFrame columns
        feature_names = self.loader.feature_names
        df_transformed = pd.DataFrame(arr_transformed, columns=feature_names)  # type: ignore

        class_to_explain = 1
        # 4. Predict using the classifier
        tree_model = self.loader.pipeline.named_steps["classifier"]

        class_idx = list(tree_model.classes_).index(class_to_explain)

        # ========== DEBUG ==========
        logger.debug(f"model.classes_ = {tree_model.classes_}")
        logger.debug(f"class_to_explain = {class_to_explain}")
        logger.debug(f"class_idx = {class_idx}")

        pred = tree_model.predict(df_transformed)[0]
        proba = tree_model.predict_proba(df_transformed)
        logger.debug(f"predict_proba = {proba}")
        logger.debug(
            f"Probabilitas kelas {class_to_explain} (idx di proba: {class_idx}): {proba[0][class_idx]}"
        )

        shap_img = waterfall_plot_base64(
            self.explainer, df_transformed, class_idx=class_idx, max_display=10
        )

        return PredictionOutput(
            prediction=int(pred),
            probability=float(proba[0][class_idx]),
            shap_plot_base64=shap_img,
        )


# FOR TEST ONLY

# if __name__ == "__main__":
#     service = MedicalModelService()
#     service.load_model()

#     payload = PredictionInput(
#         age=55,
#         sex="male",
#         chestPainType="typical angina",
#         restingBloodPressure=130,
#         cholesterol=250,
#         fastingBloodSugar=">120mg/dl",
#         restingEcg="normal",
#         maxHeartRate=160,
#         exerciseInducedAngina="no",
#         stDepression=2.3,
#         stSlope="flat",
#         numMajorVessels=0,
#         thalassemia="normal",
#     )

#     output = service.predict(payload)

#     logger.debug(f"Prediction: {output.prediction}")
#     logger.debug(f"Probability: {output.probability}")

#     # === Simpan plot SHAP ke HTML ===
#     html = f"""
#     <html><body>
#     <h2>SHAP waterfall plot untuk prediksi input dummy</h2>
#     <p>Prediksi: {output.prediction}</p>
#     <p>Probabilitas: {output.probability:.4f}</p>
#     <img src="{output.shap_plot_base64}" />
#     </body></html>
#     """

#     filename = "shap_plot_dummy.html"
#     with open(filename, "w") as f:
#         f.write(html)

#     logger.info(f"✅ Plot SHAP disimpan ke {filename}")
