import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import AppCard from "./components/FeatureCard/AppCard"
import { Routes, Route } from "react-router-dom"
import Ai from "./pages/Ai"
import Stat from "./pages/Stat/Stat"
import Home from "./pages/Home"
import Ml from "./pages/Ml"
import EmailVerificationPage from "./pages/Auth/EmailVerificationPage"
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage"
import LoginPage from "./pages/Auth/LoginPage"
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage"
import SignUpPage from "./pages/Auth/SignupPage"
import useAuthUser from "./hooks/useAuthUser"
import LoadingSpinner from "./components/LoadingSpinner"
import { Navigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import PredictionForm from "./components/PredictionForm"


function App() {

  const { authUser, isLoading } = useAuthUser()


  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  return (
    <div className="App">
      <Toaster position="top-right" />
      <Navbar authUser={authUser} />

      <Routes>
        {/* Home & Stat: publik */}
        <Route path="/" element={<Home />} />
        <Route path="/stat" element={<Stat />} />

        {/* ML & AI: privat */}
        <Route
          path="/ml"
          element={authUser ? <Ml /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/ai"
          element={authUser ? <Ai /> : <Navigate to="/login" replace />}
        />

        {/* Auth pages: hanya untuk guest */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/forgot-password"
          element={!authUser ? <ForgotPasswordPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/reset-password/:token"
          element={!authUser ? <ResetPasswordPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/verify-email"
          element={!authUser ? <EmailVerificationPage /> : <Navigate to="/" replace />}
        />

        {/* fallback */}
        <Route path="/coba" element={<PredictionForm />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
