import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api/api";
import Loader from "../../ui/Loader";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { useUser } from "../../../context/user/UserContext";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const { setUser, setIsLoggedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const redirect = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  // Autofocus on email field
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/admin-login", data);
      setUser(res.data.user);
      setIsLoggedIn(res.data.isLoggedIn);
      toast.success("Login successful! Welcome Admin 🎉");
      redirect("/admin/products");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email or password ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center mt-1">
              <FaEnvelope className="absolute ml-3 text-gray-400" />
              <input
                ref={emailRef}
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-green-500 focus:ring-2 focus:ring-green-400"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 font-bold">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center mt-1">
              <FaLock className="absolute ml-3 text-gray-400" />
              <input
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Enter password"
                className={`pl-10 pr-10 w-full px-4 py-2 border rounded-lg focus:outline-none ${
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
            </div>
            {errors.password && (
              <p className="text-red-500 font-bold">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="cursor-pointer w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="loader border-t-2 border-white w-5 h-5 rounded-full animate-spin"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Footer */}
      </div>
    </div>
  );
};

export default AdminLogin;
