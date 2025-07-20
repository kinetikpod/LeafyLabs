from core.logger import logger
from app.ml.services import MedicalModelService
from app.ml.schemes import PredictionInput


def test_shap():
    service = MedicalModelService()
    service.load_model()

    payload = PredictionInput(
        age=55,
        sex="male",
        chestPainType="typical angina",
        restingBloodPressure=130,
        cholesterol=250,
        fastingBloodSugar=">120mg/dl",
        restingEcg="normal",
        maxHeartRate=160,
        exerciseInducedAngina="no",
        stDepression=2.3,
        stSlope="flat",
        numMajorVessels=0,
        thalassemia="normal",
    )

    output = service.predict(payload)

    logger.debug(f"Prediction: {output.prediction}")
    logger.debug(f"Probability: {output.probability}")

    # === Simpan plot SHAP ke HTML ===
    html = f"""
    <html><body>
    <h2>SHAP waterfall plot untuk prediksi input dummy</h2>
    <p>Prediksi: {output.prediction}</p>
    <p>Probabilitas: {output.probability:.4f}</p>
    <img src="{output.shap_plot_base64}" />
    </body></html>
    """

    filename = "shap_plot_dummy.html"
    with open(filename, "w") as f:
        f.write(html)

    logger.info(f"✅ Plot SHAP disimpan ke {filename}")


if __name__ == "__main__":
    test_shap()
