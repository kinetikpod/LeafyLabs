import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePredict } from '../hooks/usePredict';
import { heartFormDefaults } from '../utils';
import { Trash2, Download } from "lucide-react"

export default function PredictionForm() {
  const { register, handleSubmit, reset } = useForm(
    { defaultValues: heartFormDefaults }
  );
  const { predict, isSubmitting, isError } = usePredict();
  const [results, setResults] = useState([]);

  const onSubmit = async (data) => {
    try {
      // Konversi field numerik ke number
      const numericFields = [
        'age',
        'restingBloodPressure',
        'cholesterol',
        'maxHeartRate',
        'stDepression',
        'numMajorVessels',
      ];

      const payload = {
        ...data,
        ...Object.fromEntries(
          numericFields.map((key) => [key, Number(data[key])])
        ),
      };

      console.log('▶️ payload sent to /ml/prediction:', payload);

      const res = await predict(payload);
      const newResult = { ...res, id: crypto.randomUUID() };
      setResults((prev) => [newResult, ...prev]);
      // reset();
    } catch (err) {
      console.error('Prediction error:', err);
    }
  };

  const removeResult = (id) => {
    setResults((prev) => prev.filter((r) => r.id !== id));
  };
  return (
    <div className="flex w-full justify-between items-start">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2.5 max-w-md p-5 rounded-2xl bg-gray-900 border border-gray-700 ml-2 text-white"
      >
        {/* Title */}
        <div className="relative flex items-center pl-8 text-2xl font-semibold text-blue-400">
          <span className="absolute left-0 h-4 w-4 rounded-full bg-blue-400"></span>
          <span className="absolute left-0 h-4 w-4 rounded-full bg-blue-400 animate-ping"></span>
          Prediction Input
        </div>
        <p className="text-sm text-gray-400">Enter patient data for prediction.</p>

        {/* Row 1: age & sex */}
        <div className="flex gap-1.5 w-full">
          {/* Age */}
          <label className="relative flex-1">
            <input
              type="number"
              step="1"
              placeholder=" "
              required
              {...register('age')}
              className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
              style={{ appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'none' }}
            />
            <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
        peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
        peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
              Age
            </span>
          </label>

          {/* Sex */}
          <label className="relative flex-1">
            <select
              {...register('sex')}
              required
              className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
            >
              <option value="" disabled hidden></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
        peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
        peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
              Sex
            </span>
          </label>
        </div>

        {/* Row 2: chestPainType & restingBloodPressure */}
        <div className="flex gap-1.5 w-full">
          <label className="relative flex-1">
            <select
              {...register('chestPainType')}
              required
              className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
            >
              <option value="" disabled hidden></option>
              <option value="typical angina">Typical Angina</option>
              <option value="atypical angina">Atypical Angina</option>
              <option value="non-anginal pain">Non-Anginal Pain</option>
              <option value="asymptomatic">Asymptomatic</option>
            </select>
            <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
        peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
        peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
              Chest Pain Type
            </span>
          </label>
          <label className="relative flex-1">
            <input
              type="number"
              step="1"
              placeholder=" "
              required
              {...register('restingBloodPressure')}
              className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
              style={{ appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'none' }}
            />
            <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
        peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
        peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
              Resting Blood Pressure
            </span>
          </label>
        </div>

        {/* Row 3: cholesterol & fastingBloodSugar */}
        <div className="flex gap-1.5 w-full">
          <label className="relative flex-1">
            <input
              type="number"
              step="any"
              placeholder=" "
              required
              {...register('cholesterol')}
              className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
              style={{ appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'none' }}
            />
            <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
        peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
        peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
              Cholesterol
            </span>
          </label>
          <label className="relative flex-1">
            <select
              {...register('fastingBloodSugar')}
              required
              className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
            >
              <option value="" disabled hidden></option>
              <option value="<=120mg/dl">{"<=120mg/dl"}</option>
              <option value=">120mg/dl">{">120mg/dl"}</option>
            </select>
            <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
        peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
        peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
              Fasting Blood Sugar
            </span>
          </label>
        </div>

        {/* Row 4: restingEcg & maxHeartRate */}
        <div className="flex gap-1.5 w-full">
          <label className="relative flex-1">
            <select
              {...register('restingEcg')}
              required
              className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
            >
              <option value="" disabled hidden></option>
              <option value="normal">Normal</option>
              <option value="ST-T wave abnormality">ST-T Wave Abnormality</option>
              <option value="left ventricular hypertrophy">Left Ventricular Hypertrophy</option>
            </select>
            <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
        peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
        peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
              Resting ECG
            </span>
          </label>
          <label className="relative flex-1">
            <input
              type="number"
              step="1"
              placeholder=" "
              required
              {...register('maxHeartRate')}
              className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
              style={{ appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'none' }}
            />
            <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
        peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
        peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
              Max Heart Rate
            </span>
          </label>
        </div>

        {/* Row 5: exerciseInducedAngina & stDepression */}
        <div className="flex gap-1.5 w-full">
          <label className="relative flex-1">
            <select
              {...register('exerciseInducedAngina')}
              required
              className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
            >
              <option value="" disabled hidden></option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
        peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
        peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
              Exercise Induced Angina
            </span>
          </label>
          <label className="relative flex-1">
            <input
              type="number"
              step="any"
              placeholder=" "
              required
              {...register('stDepression')}
              className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
              style={{ appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'none' }}
            />
            <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
        peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
        peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
              ST Depression
            </span>
          </label>
        </div>

        {/* Row 6: stSlope & numMajorVessels */}
        <div className="flex gap-1.5 w-full">
          <label className="relative flex-1">
            <select
              {...register('stSlope')}
              required
              className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
            >
              <option value="" disabled hidden></option>
              <option value="upsloping">Upsloping</option>
              <option value="flat">Flat</option>
              <option value="downsloping">Downsloping</option>
            </select>
            <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
        peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
        peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
              ST Slope
            </span>
          </label>
          <label className="relative flex-1">
            <input
              type="number"
              step="1"
              placeholder=" "
              required
              {...register('numMajorVessels')}
              className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
              style={{ appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'none' }}
            />
            <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
        peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
        peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
              Num Major Vessels
            </span>
          </label>
        </div>

        {/* Row 7: thalassemia & Submit */}
        <div className="flex gap-1.5 w-full items-end">
          <label className="relative flex-1">
            <select
              {...register('thalassemia')}
              required
              className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
            >
              <option value="" disabled hidden></option>
              <option value="normal">Normal</option>
              <option value="fixed defect">Fixed Defect</option>
              <option value="reversible defect">Reversible Defect</option>
            </select>
            <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
        peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
        peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
              Thalassemia
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="py-5 flex-1 rounded-lg text-white text-base bg-blue-400 hover:bg-blue-400/60 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Predicting...' : 'Predict'}
          </button>
        </div>
      </form>


      {/* Result Cards */}

      <div className="flex gap-4 w-full max-w-4xl flex-col">
        {results.map((result, index) => (
          <div
            key={index}
            className={`relative w-full p-5 rounded-2xl border shadow transition-all
        ${result.prediction === 1
                ? 'bg-red-100 border-red-300'
                : 'bg-green-100 border-green-300'
              }`}
          >
            {/* Delete Button */}
            <button
              onClick={() => removeResult(result.id)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
              aria-label="Remove result"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            {/* Prediction Title */}
            <h2
              className={`text-xl font-bold mb-2
          ${result.prediction === 1 ? 'text-red-700' : 'text-green-700'}`}
            >
              {result.prediction === 1
                ? '💔 Positive for Heart Disease'
                : '💚 Negative for Heart Disease'}
            </h2>

            {/* Probability */}
            <p className="text-sm text-gray-700 mb-4">
              Model confidence:{" "}
              <span className="font-medium">
                {(result.probability * 100).toFixed(2)}%
              </span>
            </p>

            {/* SHAP Plot */}
            {result.shap_plot_base64?.startsWith("data:image") ? (
              <div className="relative">
                <img
                  src={result.shap_plot_base64}
                  alt="SHAP Force Plot"
                  className="w-full h-auto max-h-[650px] object-contain rounded shadow-sm"
                />

                {/* Download Button */}
                <a
                  href={result.shap_plot_base64}
                  download={`shap_result_${index + 1}.png`}
                  className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                  aria-label="Download SHAP image"
                >
                  <Download className="w-4 h-4 text-gray-700" />
                </a>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                SHAP plot unavailable.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

