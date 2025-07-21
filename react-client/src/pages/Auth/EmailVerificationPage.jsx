import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";

const EmailVerificationPage = () => {
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { error, isSubmitting, verifyEmail } = useVerifyEmail();

  const { control, handleSubmit, getValues, setValue, watch } = useForm({
    defaultValues: {
      code: ["", "", "", "", "", ""],
    },
  });

  const code = watch("code");

  const onSubmit = async (data) => {
    const token = data.code.join("");
    try {
      await verifyEmail({token});
      navigate("/");
      toast.success("Email verified successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (index, value) => {
    const trimmed = value.slice(0, 1);
    const currentCode = getValues("code");
    const newCode = [...currentCode];
    newCode[index] = trimmed;
    setValue("code", newCode);

    if (trimmed && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Auto-submit when all 6 fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(onSubmit)();
    }
  }, [code]);

  return (
  <div className="flex justify-center items-center h-screen">
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-between">
            {[...Array(6)].map((_, index) => (
              <Controller
                key={index}
                name={`code.${index}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={field.value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
                  />
                )}
              />
            ))}
          </div>

          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting || code.some((digit) => !digit)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isSubmitting ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
    </div>
  );
};

export default EmailVerificationPage;

