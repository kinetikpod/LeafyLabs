import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useResetPassword } from "../../hooks/useResetPassword";
import Input from "../../components/Input";
import { useState } from "react"

const ResetPasswordPage = () => {
  const [message, setMessage] = useState('');
  const { resetPassword, error, isSubmitting } = useResetPassword()
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { message } = await resetPassword({ token: token || '', newPassword: data.password });

      setMessage(message)
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error(err)
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mx-auto"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Reset Password
          </h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
          {errors.password && (
            <p className="text-red-400 text-sm mb-2">
              Password is required and must be at least 6 characters.
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              icon={Lock}
              type="password"
              placeholder="New Password"
              {...register("password", { required: true, minLength: 6 })}
            />

            <Input
              icon={Lock}
              type="password"
              placeholder="Confirm New Password"
              {...register("confirmPassword", { required: true })}
            />

            {password !== confirmPassword && (
              <p className="text-red-400 text-sm mb-2">Passwords do not match</p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Set New Password"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;

