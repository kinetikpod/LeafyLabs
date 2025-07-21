export default function PredictionForm() {
  return (
  <div className="flex w-fit">
    <form className="flex flex-col gap-2.5 max-w-md p-5 rounded-2xl bg-gray-900 border border-gray-700 text-white">
      {/* Title with decorative circles */}
      <div className="relative flex items-center pl-8 text-2xl font-semibold text-blue-400">
        <span className="absolute left-0 h-4 w-4 rounded-full bg-blue-400"></span>
        <span className="absolute left-0 h-4 w-4 rounded-full bg-blue-400 animate-ping"></span>
        Prediction Input
      </div>

      {/* Subtitle message */}
      <p className="text-sm text-gray-400">
        Enter patient data for prediction.
      </p>

      {/* Row 1: Age & Gender */}
      <div className="flex gap-1.5 w-full">
        <label className="relative flex-1">
          <input
            type="number"
            name="Age"
            placeholder=" "
            required
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
        <label className="relative flex-1">
          <input
            type="number"
            name="Gender"
            placeholder=" "
            required
            className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
          />
          <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                             peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
                             peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
            Gender
          </span>
        </label>
      </div>

      {/* Row 2: Heart Rate & Systolic Blood Pressure */}
      <div className="flex gap-1.5 w-full">
        <label className="relative flex-1">
          <input
            type="number"
            step="any"
            name="Heart rate"
            placeholder=" "
            required
            className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
          />
          <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                             peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
                             peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
            Heart rate
          </span>
        </label>

        <label className="relative flex-1">
          <input
            type="number"
            step="any"
            name="Diastolic blood pressure"
            placeholder=" "
            required
            className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
          />
          <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                             peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
                             peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
            Systolic blood pressure
          </span>
        </label>
        
      </div>

      {/* Row 3: Diastolic Blood Pressure & Blood Sugar */}
      <div className="flex gap-1.5 w-full">
        <label className="relative flex-1">
          <input
            type="number"
            step="any"
            name="Diastolic blood pressure"
            placeholder=" "
            required
            className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
          />
          <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                             peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
                             peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
            Diastolic blood pressure
          </span>
        </label>
        <label className="relative flex-1">
          <input
            type="number"
            step="any"
            name="Blood sugar"
            placeholder=" "
            required
            className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
          />
          <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                             peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
                             peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
            Blood sugar
          </span>
        </label>
      </div>

      {/* Row 4: CK-MB & Troponin */}
      <div className="flex gap-1.5 w-full">
        <label className="relative flex-1">
          <input
            type="number"
            step="any"
            name="CK-MB"
            placeholder=" "
            required
            className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
          />
          <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                             peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
                             peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
            CK-MB
          </span>
        </label>
        <label className="relative flex-1">
          <input
            type="number"
            step="any"
            name="Troponin"
            placeholder=" "
            required
            className="peer bg-gray-800 text-white w-full py-5 px-3 border border-gray-600 rounded-lg outline-none"
          />
          <span className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                             peer-focus:-top-0.5 peer-focus:text-xs peer-focus:text-blue-400
                             peer-valid:-top-0.5 peer-valid:text-xs peer-valid:text-blue-400">
            Troponin
          </span>
        </label>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="py-2 rounded-lg text-white text-base bg-blue-400 hover:bg-blue-400/60 transition-colors"
      >
        Predict
      </button>
    </form>
      
    </div>
  );
}


