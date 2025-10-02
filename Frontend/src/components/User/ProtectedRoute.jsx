import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export const ProtectedRoute = ({ children }) => {
  const { user, isLoggedIn } = useUser();

  if (!isLoggedIn) return <Navigate to="/auth/login" replace />;
  if (isLoggedIn && user.role === "admin")
    return <Navigate to="/admin/products" replace />;

  return children;
};
