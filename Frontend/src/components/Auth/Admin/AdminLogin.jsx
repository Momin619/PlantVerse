import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api/api";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from "../../../context/UserContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const AdminLogin = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const redirect = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/admin-login", data);
      setUser(res.data.user);
      setIsLoggedIn(res.data.isLoggedIn);
      toast.success("Login successful! Welcome back Admin 🌱");
      redirect("/admin/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              placeholder="Enter your email"
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
              })}
              placeholder="Enter password"
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
              className="cursor-pointer absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {errors.password && (
              <p className="text-red-500 font-bold">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <input
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? "Submitting" : "Login"}
            className="cursor-pointer w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          />
        </form>

        {/* Footer */}
      </div>
    </div>
  );
};

export default AdminLogin;
