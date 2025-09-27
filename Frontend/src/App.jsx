import { Routes, Route } from "react-router-dom";
import { useSessionCheck } from "./hooks/useSessionCheck";
import Loader from "./components/ui/Loader";
import { AdminRoute } from "./components/Admin/AdminRoute";
import { ProtectedRoute } from "./components/User/ProtectedRoute";
import "./styles/output.css";
import HomePage from "./pages/Home/HomePage";
import SignupPage from "./pages/Auth/User/SignupPage";
import LoginPage from "./pages/Auth/User/LoginPage";
import AdminLoginPage from "./pages/Auth/Admin/AdminLoginPage";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import UserProfilePage from "./pages/User/UserProfilePage";
import PageNotFound from "./components/ui/PageNotFound";
import AddProductPage from "./pages/Admin/AddProductPage";
export default function App() {
  const loading = useSessionCheck();

  if (loading) return <Loader />;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/admin-login" element={<AdminLoginPage />} />

      {/* Protected User Routes */}
      <Route
        path="/user/profile"
        element={
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/add-product"
        element={
          <AdminRoute>
            <AddProductPage />
          </AdminRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
