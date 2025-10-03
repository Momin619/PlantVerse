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

        // Debug logging
        console.log(
          "[useSessionCheck] PATH:",
          location.pathname,
          "isLoggedIn:",
          isLoggedIn,
          "role:",
          user?.role
        );

        // Define public routes
        const publicUserRoutes = ["/auth/login", "/auth/signup"];
        const publicAdminRoutes = ["/auth/admin-login"];

        const isPublic =
          publicUserRoutes.some((route) =>
            location.pathname.startsWith(route)
          ) ||
          publicAdminRoutes.some((route) =>
            location.pathname.startsWith(route)
          );

        // Guest (not logged in)
        if (!isLoggedIn) {
          if (!isPublic) {
            if (location.pathname.startsWith("/admin")) {
              console.log("[Redirect] Guest → Admin Login");
              navigate("/auth/admin-login", { replace: true });
            } else {
              console.log("[Redirect] Guest → User Login");
              navigate("/auth/login", { replace: true });
            }
          }
        } else {
          // Logged in ADMIN trying to access user auth pages
          if (
            user.role === "admin" &&
            publicUserRoutes.some((route) =>
              location.pathname.startsWith(route)
            )
          ) {
            console.log("[Redirect] Admin → Admin Dashboard");
            navigate("/admin/dashboard", { replace: true });
          }

          // Logged in USER trying to access admin auth or signup
          if (
            user.role === "user" &&
            (publicAdminRoutes.some((route) =>
              location.pathname.startsWith(route)
            ) ||
              location.pathname.startsWith("/auth/signup"))
          ) {
            console.log("[Redirect] User → Home");
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
