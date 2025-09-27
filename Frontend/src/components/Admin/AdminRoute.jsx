import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export const AdminRoute = ({ children }) => {
  const { user, isLoggedIn } = useUser();

  if (!isLoggedIn) return <Navigate to="/auth/admin-login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
};
