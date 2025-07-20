import base64
import io
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import shap
import pandas as pd


def waterfall_plot_base64(
    explainer: shap.Explainer,
    df_transformed: pd.DataFrame,
    class_idx: int,
    max_display: int = 10,
) -> str:
    # 1. Minta shap untuk mennjelaskan input yang mau dijelaskan
    shap_exp = explainer(df_transformed)

    # 0 -> akses shap values nya
    # : -> include semua fitur di predict_proba
    # class_idx -> label kelas apa yang ingin shap untuk menjelaskan
    values = shap_exp.values[0, :, class_idx]
    base_values = shap_exp.base_values[0, class_idx]

    exp0 = shap.Explanation(
        values=values,
        base_values=base_values,
        data=shap_exp.data[0],
        feature_names=shap_exp.feature_names,
    )

    # 3. Buat figur dengan orientasi vertikal
    plt.rcParams.update({"font.size": 8})
    fig = plt.figure(figsize=(6, 8))  # lebih tinggi daripada lebar

    # 4. Buat waterfall plot, batasi top-K fitur
    shap.plots.waterfall(exp0, max_display=max_display, show=False)

    # 5. Serialize ke PNG base64
    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight", dpi=100)
    buf.seek(0)
    img_b64 = base64.b64encode(buf.read()).decode("utf-8")
    plt.close(fig)

    return f"data:image/png;base64,{img_b64}"


#

# explainer = shap.Explainer(model.predict, X) -> “Hai SHAP, tolong pelajari cara kerja model.predict dengan data X, agar kamu bisa menjelaskan nanti kenapa model memprediksi sesuatu.”

# explainer = shap.Explainer(guru_menilai, data_siswa_lama)
# penjelasan = explainer(data_siswa_baru)
