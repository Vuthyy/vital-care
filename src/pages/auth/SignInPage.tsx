import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { loginUser, type LoginRequest } from "../../services/authService";

type FieldErrors = {
  username_or_email?: string;
  password?: string;
};

export default function SignInPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<LoginRequest>({
    username_or_email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (!formData.username_or_email.trim()) {
      errors.username_or_email = "Email or Username is required";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // client validation first
    if (!validate()) return;

    setLoading(true);
    try {
      const data = await loginUser(formData);
      console.log("Login Success:", data);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const onChangeUsernameOrEmail = (value: string) => {
    setFormData((prev) => ({ ...prev, username_or_email: value }));
    setFieldErrors((prev) => ({ ...prev, username_or_email: undefined }));
    setError(null);
  };

  const onChangePassword = (value: string) => {
    setFormData((prev) => ({ ...prev, password: value }));
    setFieldErrors((prev) => ({ ...prev, password: undefined }));
    setError(null);
  };

  return (
    <div className="h-full bg-[#F9F9FF] overflow-y-auto no-scrollbar">
      {/* Header Section */}
      <div className="ios-gradient h-72 w-full relative pt-12 px-6 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-white opacity-90 hover:opacity-100 transition-all"
            type="button"
          >
            <ChevronLeftIcon fontSize="large" />
          </button>

          <div className="flex items-center gap-4">
            <span className="text-white/70 text-sm">
              Don't have an account?
            </span>
            <button
              onClick={() => navigate("/signup")}
              className="bg-white/20 hover:bg-white/30 text-white text-sm font-bold px-4 py-2.5 rounded-lg backdrop-blur-md transition-all"
              type="button"
            >
              Get Started
            </button>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white tracking-tight mt-1">
          VitalCare
        </h1>
      </div>

      {/* Form Card */}
      <div className="-mt-20 relative z-10 bg-white rounded-t-[3.5rem] px-8 pt-8 pb-12 min-h-150">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-base mt-2 font-medium">
            Enter your details below
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin} noValidate>
          {/* Email or Username */}
          <div>
            <Input
              label="Email or Username"
              type="text"
              placeholder="Enter your email or username"
              value={formData.username_or_email}
              onChange={(e) => onChangeUsernameOrEmail(e.target.value)}
              required
              error={!!fieldErrors.username_or_email}
            />
            {fieldErrors.username_or_email && (
              <p className="text-red-500 text-xs font-medium mt-2 ml-4">
                {fieldErrors.username_or_email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => onChangePassword(e.target.value)}
                required
                error={!!fieldErrors.password}
              />

              {/* Eye toggle */}
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-9.5 text-gray-400 hover:text-gray-600 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>

            {fieldErrors.password && (
              <p className="text-red-500 text-xs font-medium mt-2 ml-4">
                {fieldErrors.password}
              </p>
            )}

            {/* Server/global error */}
            {error && (
              <div className="flex items-start gap-2 mt-3 ml-4">
                <p className="text-red-500 text-xs font-medium">{error}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full btn-gradient text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition transform active:scale-[0.97] mt-4 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="text-center">
            <button
              onClick={() => navigate("/forgot-password")}
              type="button"
              className="text-sm font-bold text-gray-400 hover:text-primary transition-colors mt-2"
            >
              Forgot your password?
            </button>
          </div>

          {/* Divider */}
          <div className="relative py-4">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] tracking-widest font-bold">
              <span className="text-sm bg-white px-4 text-gray-300">
                Or sign in with
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center space-x-2 border border-gray-100 rounded-2xl py-3.5 hover:bg-gray-50 transition shadow-sm"
            >
              <img
                alt="Google"
                className="w-4 h-4"
                src="https://www.google.com/favicon.ico"
              />
              <span className="text-sm font-bold text-gray-600">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center space-x-2 border border-gray-100 rounded-2xl py-3.5 hover:bg-gray-50 transition shadow-sm"
            >
              <svg
                className="w-4 h-4 text-[#1877F2]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-bold text-gray-600">Facebook</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
