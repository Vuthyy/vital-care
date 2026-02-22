import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { registerUser } from "../../services/authService";
import { usePasswordStrength } from "../../hooks/usePasswordStrength";

type Gender = "MALE" | "FEMALE" | "OTHER";

const isGender = (v: string): v is Gender =>
  v === "MALE" || v === "FEMALE" || v === "OTHER";

type FieldErrors = Partial<
  Record<
    | "username"
    | "email"
    | "password"
    | "name"
    | "phone_number"
    | "age"
    | "gender",
    string
  >
>;

export default function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    phone_number: "",
    age: "" as "" | number,
    gender: "" as "" | Gender,
  });

  const { bars, label, color } = usePasswordStrength(formData.password);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // global server error

  const baseInputClass =
    "w-full text-base px-5 py-3.5 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl " +
    "text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 " +
    "focus:ring-primary/20 transition-all";

  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim()))
      errors.email = "Email is invalid";

    if (!formData.username.trim()) errors.username = "Username is required";
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.phone_number.trim())
      errors.phone_number = "Phone number is required";

    if (formData.age === "" || Number.isNaN(Number(formData.age)))
      errors.age = "Age is required";
    else {
      const age = Number(formData.age);
      if (age < 1 || age > 120) errors.age = "Age must be between 1 and 120";
    }

    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.password.trim()) errors.password = "Password is required";
    else if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const setField = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    setError(null);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      await registerUser({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        name: formData.name.trim(),
        phone_number: formData.phone_number.trim(),
        age: Number(formData.age),
        gender: formData.gender as Gender,
      });

      navigate("/");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar font-display">
      {/* Header */}
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
              Already have an account?
            </span>
            <button
              onClick={() => navigate("/signin")}
              className="bg-white/20 hover:bg-white/30 text-white text-sm font-bold px-4 py-2.5 rounded-lg backdrop-blur-md transition-all"
              type="button"
            >
              Sign in
            </button>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white tracking-tight mt-1">
          VitalCare
        </h1>
      </div>

      {/* Sheet */}
      <div className="-mt-20 relative z-10 bg-white rounded-t-[3.5rem] px-8 pt-8 pb-12 min-h-150">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Get started free.
          </h2>
          <p className="text-gray-400 text-base mt-2 font-medium">
            Free forever. No credit card needed.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleRegister} noValidate>
          {/* Email */}
          <div>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={(e) => setField("email", e.target.value)}
              required
              error={!!fieldErrors.email}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs font-medium mt-2 ml-4">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <Input
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setField("username", e.target.value)}
              required
              error={!!fieldErrors.username}
            />
            {fieldErrors.username && (
              <p className="text-red-500 text-xs font-medium mt-2 ml-4">
                {fieldErrors.username}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <Input
              label="Your Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setField("name", e.target.value)}
              required
              error={!!fieldErrors.name}
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-xs font-medium mt-2 ml-4">
                {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+855 12 345 678"
              className={baseInputClass}
              value={formData.phone_number}
              onChange={(e) => setField("phone_number", e.target.value)}
              required
              error={!!fieldErrors.phone_number}
            />
            {fieldErrors.phone_number && (
              <p className="text-red-500 text-xs font-medium mt-2 ml-4">
                {fieldErrors.phone_number}
              </p>
            )}
          </div>

          {/* Age + Gender */}
          <div className="grid grid-cols-2 gap-4">
            {/* Age */}
            <div>
              <Input
                label="Age"
                type="number"
                placeholder="25"
                min={1}
                className={baseInputClass}
                value={formData.age}
                onChange={(e) =>
                  setField(
                    "age",
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                required
                error={!!fieldErrors.age}
              />
              {fieldErrors.age && (
                <p className="text-red-500 text-xs font-medium mt-2 ml-4">
                  {fieldErrors.age}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 ml-1 uppercase tracking-wider">
                Gender
              </label>

              <select
                className={`${baseInputClass} appearance-none ${
                  fieldErrors.gender ? "ring-2 ring-red-400/40" : ""
                }`}
                value={formData.gender}
                onChange={(e) => {
                  const v = e.target.value;
                  if (isGender(v))
                    setField("gender", v); // ✅ no any
                  else setField("gender", ""); // for safety
                }}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>

              {fieldErrors.gender && (
                <p className="text-red-500 text-xs font-medium mt-2 ml-4">
                  {fieldErrors.gender}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Input
                label="Password"
                type="password"
                className={baseInputClass}
                placeholder="Enter a strong password"
                value={formData.password}
                onChange={(e) => setField("password", e.target.value)}
                required
                error={!!fieldErrors.password}
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

            {fieldErrors.password && (
              <p className="text-red-500 text-xs font-medium mt-2 ml-4">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Global backend error */}
          {error && (
            <p className="text-xs text-red-500 font-medium px-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`btn-gradient w-full py-4 rounded-2xl text-white font-bold shadow-lg shadow-primary/20 active:scale-[0.98] ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
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
