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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AdminProductsPage from "./pages/Admin/AdminProductsPage";
import EditProductPage from "./pages/Admin/EditProductPage";
import ProductsPage from "./pages/User/ProductsPage";
import ProductsDetailsPage from "./pages/User/ProductsDetailsPage";
import FavouritesPage from "./pages/User/FavouritesPage";
import CartPage from "./pages/User/CartPage";
export default function App() {
  const loading = useSessionCheck();
  if (loading) return <Loader fullscreen={true} />;

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favourites"
          element={
            <ProtectedRoute>
              <FavouritesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product-detail/product/:id"
          element={
            <ProtectedRoute>
              <ProductsDetailsPage />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProductsPage />
            </AdminRoute>
          }
        />
        <Route
          path={`/admin/edit-product/product/:id`}
          element={
            <AdminRoute>
              <EditProductPage />
            </AdminRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          backgroundColor: "#fff",
          color: "#000",
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "clamp(0.8rem, 2.5vw, 1rem)", // Responsive font size
          maxWidth: "90vw", // Prevents overflow on small screens
        }}
        bodyClassName="flex items-center justify-center"
      />
    </>
  );
}
