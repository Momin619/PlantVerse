import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { api } from "../../services/api/api";
import { useState } from "react";
import Loader from "../ui/Loader";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
export default function Signup() {
  const redirect = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    delete data.confirmPassword;
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", data);
      toast.success("Account created 🎉 Please login");
      redirect("/auth/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-600 mb-6">
          Create Your Account
        </h2>

        {/* Form */}
        <form
          className="space-y-5"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register("fullName", {
                required: {
                  value: true,
                  message: "Fullname is required",
                },
                minLength: {
                  value: 3,
                  message: "minimum 3 characters required",
                },
                maxLength: {
                  value: 6,
                  message: "Maximum 6 characters are allowed",
                },
              })}
              autoComplete="off"
              type="text"
              placeholder="Enter your full name"
              className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none
    ${
      errors.fullName
        ? "border-red-500 focus:ring-2 focus:ring-red-400"
        : "border-green-500 focus:ring-2 focus:ring-green-400"
    }`}
            />
            {errors.fullName && (
              <p className="text-red-500 font-bold  ">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              autoComplete="off"
              {...register("email", {
                required: { value: true, message: "Email is required" },
              })}
              placeholder="you@example.com"
              className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none
    ${
      errors.email
        ? "border-red-500 focus:ring-2 focus:ring-red-400"
        : "border-green-500 focus:ring-2 focus:ring-green-400"
    }`}
            />
            {errors.email && (
              <p className="text-red-500 font-bold"> {errors.email.message} </p>
            )}
          </div>

          {/* Password */}
          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required ",
                },
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                  message: "Password must include uppercase, number & symbol",
                },
              })}
              placeholder="Enter a secure password"
              className={`mt-1 w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none
      ${
        errors.password
          ? "border-red-500 focus:ring-2 focus:ring-red-400"
          : "border-green-500 focus:ring-2 focus:ring-green-400"
      }`}
            />
            {/* Toggle button */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {errors.password && (
              <p className="text-red-500 font-bold">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              autoComplete="off"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Please re-enter your password",
                },
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Re-enter your password"
              className={`mt-1 w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none
      ${
        errors.confirmPassword
          ? "border-red-500 focus:ring-2 focus:ring-red-400"
          : "border-green-500 focus:ring-2 focus:ring-green-400"
      }`}
            />
            {/* Toggle button */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {errors.confirmPassword && (
              <p className="text-red-500 font-bold">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <input
            disabled={isSubmitting}
            value={isSubmitting ? "Submitting" : "Signup"}
            type="submit"
            className="cursor-pointer w-full bg-green-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
          />
        </form>

        {/* Redirect */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-green-500 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
