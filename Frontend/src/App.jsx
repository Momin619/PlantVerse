import React, { useEffect, useState } from "react";
import "./styles/output.css";
import HomePage from "./pages/Home/HomePage";
import SignupPage from "./pages/Auth/Signup/SignupPage";
import LoginPage from "./pages/Auth/Login/LoginPage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { api } from "./services/api/api";
import { useUser } from "./context/UserContext";
import Loader from "./components/ui/Loader";
import PageNotFound from "./components/ui/PageNotFound";
export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, setIsLoggedIn, setUser } = useUser();

  const fetchSession = async () => {
    try {
      const res = await api.get("/user-auth");
      const { user, isLoggedIn } = res.data;

      setUser(user);
      setIsLoggedIn(isLoggedIn);

      const publicRoutes = ["/auth/login", "/auth/signup"];
      if (!isLoggedIn && !publicRoutes.includes(location.pathname)) {
        navigate("/auth/login");
      }
    } catch (err) {
      console.error("Session check failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  if (loading) return <Loader />;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
