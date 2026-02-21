import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { registerUser } from "../../services/authService";
import { usePasswordStrength } from "../../hooks/usePasswordStrength";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    phone_number: "",
    age: 0,
    gender: "MALE" as "MALE" | "FEMALE" | "OTHER",
  });

  const { bars, label, color } = usePasswordStrength(formData.password);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await registerUser(formData);
      navigate("/signin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const baseInputClass =
    "w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl " +
    "text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 " +
    "focus:ring-primary/20 transition-all text-sm";

  return (
    <div className="h-full bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar font-display">
      {/* Header */}
      <div className="ios-gradient h-64 pt-12 px-6 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-white opacity-80 hover:opacity-100"
          >
            <ChevronLeftIcon />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-white/80 text-sm">Already have account?</span>
            <button
              onClick={() => navigate("/signin")}
              className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-4 py-1.5 rounded-full backdrop-blur-md"
            >
              Sign in
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white tracking-tight">
          Vital Care
        </h1>
      </div>

      {/* Sheet */}
      <div className="-mt-16 bg-white dark:bg-card-dark rounded-t-[2.5rem] p-8 min-h-150 shadow-inner">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Get started free.
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Free forever. No credit card needed.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Email */}
          <Input
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          {/* Name */}
          <Input
            label="Your Name"
            placeholder="Enter your full name"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />

          {/* Phone Number */}
          <div className="space-y-1.5">
            <Input
              label="phone number"
              type="tel"
              placeholder="+855 12 345 678"
              className={baseInputClass}
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              required
            />
          </div>

          {/* Age + Gender */}
          <div className="grid grid-cols-2 gap-4">
            {/* Age */}
            <div className="space-y-1.5">
              <Input
                label="age"
                type="number"
                placeholder="25"
                min={1}
                className={baseInputClass}
                value={formData.age || ""}
                onChange={(e) =>
                  setFormData({ ...formData, age: Number(e.target.value) })
                }
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 ml-1 uppercase tracking-wider">
                Gender
              </label>
              <div className="relative">
                <select
                  className={`${baseInputClass} appearance-none`}
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gender: e.target.value as "MALE" | "FEMALE" | "OTHER",
                    })
                  }
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Password (keep your strength logic) */}
          <div className="space-y-1.5">
            <div className="relative">
              <Input
                label="password"
                type="password"
                className={baseInputClass}
                placeholder="Enter a strong password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />

              {/* Strength indicator */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-4 h-1 rounded-full ${
                        bars >= i
                          ? color === "green"
                            ? "bg-green-500"
                            : color === "yellow"
                              ? "bg-yellow-400"
                              : "bg-red-500"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase ${
                    color === "green"
                      ? "text-green-500"
                      : color === "yellow"
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                >
                  {label}
                </span>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 font-medium px-2">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-gradient w-full py-4 rounded-2xl text-white font-bold shadow-lg shadow-primary/20 active:scale-[0.98]"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>

          {/* Divider */}
          <div className="relative py-4">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
              <span className="bg-white px-4 text-gray-300">
                Or sign up with
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
