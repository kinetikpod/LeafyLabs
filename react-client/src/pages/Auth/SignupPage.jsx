import { motion } from "framer-motion";
import Input from "../../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import PasswordStrengthMeter from "../../components/PasswordStrengMetter";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup, error, isSubmitting } = useSignup();

  const {
    register,
    handleSubmit,
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await signup(data);
      navigate("/verify-email");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-1 mt-8 justify-center items-center ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              {...register("name", { required: true })}
            />
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              {...register("email", { required: true })}
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />

            {error && <p className="text-red-500 font-semibold mt-2">{error.message}</p>}

            <PasswordStrengthMeter password={password} />

            <motion.button
              className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
              font-bold rounded-lg shadow-lg hover:from-green-600
              hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
              focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </form>
        </div>

        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} className="text-green-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;

