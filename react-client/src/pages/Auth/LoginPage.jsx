import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { login, isSubmitting, error } = useLogin();
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const { email, password } = data;


    try {
      await login({ email, password })
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  };

  return (
  <div className="flex justify-center items-center flex-1 mt-20">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50
	             backdrop-filter backdrop-blur-xl rounded-2xl
				 shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="flex items-center mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-green-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500
			         to-emerald-600 text-white font-bold rounded-lg
					 shadow-lg hover:from-green-600 hover:to-emerald-700
					 focus:outline-none focus:ring-2 focus:ring-green-500
					 focus:ring-offset-2 focus:ring-offset-gray-900
					 transition duration-200"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
    </div>
  );
};

export default LoginPage
