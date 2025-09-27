import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { api } from "../services/api/api";

export const useSessionCheck = () => {
  const { setUser, setIsLoggedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await api.get("/user-auth"); // returns { user, isLoggedIn }
        const { user, isLoggedIn } = res.data;

        setUser(user);
        setIsLoggedIn(isLoggedIn);

        const publicUserRoutes = ["/auth/login", "/auth/signup"];
        const publicAdminRoutes = ["/auth/admin-login"];
        const publicRoutes = [...publicUserRoutes, ...publicAdminRoutes];

        if (!isLoggedIn) {
          if (!publicRoutes.includes(location.pathname)) {
            if (location.pathname.startsWith("/admin")) {
              navigate("/auth/admin-login", { replace: true });
            } else {
              navigate("/auth/login", { replace: true });
            }
          }
        } else {
          // Prevent logged-in users from accessing login pages
          if (
            user.role === "admin" &&
            publicUserRoutes.includes(location.pathname)
          ) {
            navigate("/admin/dashboard", { replace: true });
          }
          if (
            user.role === "user" &&
            publicAdminRoutes.includes(location.pathname)
          ) {
            navigate("/", { replace: true });
          }
        }
      } catch (err) {
        console.error("Session check failed:", err);
        navigate("/auth/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [location.pathname, navigate, setUser, setIsLoggedIn]);

  return loading;
};
