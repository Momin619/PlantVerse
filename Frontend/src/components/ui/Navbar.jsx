import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useUser } from "../../context/user/UserContext";
import { api } from "../../services/api/api";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // ✅ Route Checks
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isUserRoute =
    location.pathname === "/products" || location.pathname === "/favourites";

  const isHomeRoute = location.pathname === "/";

  // 🔑 Logout handler
  const handleLogout = async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout");
      setUser(null);
      setIsLoggedIn(false);
      toast.info("You’ve been logged out 👋");
      navigate(isAdminRoute ? "/auth/admin-login" : "/auth/login");
    } catch (err) {
      toast.error("Logout failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullscreen={true} />;

  // ✅ Routes
  const commonRoutes = ["Home", "About", "Cart", "Products", "Favourites"];
  const adminRoutes = ["Add-Product", "Products"];

  // ✅ Glassy + White Styles
  const navBg = isHomeRoute
    ? "bg-white/10 backdrop-blur-md border-b border-white/20" // Glassy on home
    : "bg-white border-b border-gray-200 shadow-md"; // Solid white elsewhere

  const linkColor = isHomeRoute
    ? "text-white hover:text-green-200"
    : "text-black hover:text-green-600";

  const logoPlantColor = "text-green-500";
  const logoVerseColor = isHomeRoute ? "text-white" : "text-black";

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between h-16 items-center">
          {/* ✅ Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide hover:scale-105 transition-transform"
          >
            <span className={logoPlantColor}>Plant</span>
            <span className={logoVerseColor}>Verse</span>
          </Link>

          {/* ✅ Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-lg font-medium items-center">
            {isLoggedIn && user?.role === "admin"
              ? adminRoutes.map((item) => (
                  <Link
                    key={item}
                    to={
                      item === "Products"
                        ? "/admin/products"
                        : "/admin/add-product"
                    }
                    className={`relative ${linkColor} transition-colors group`}
                  >
                    {item}
                    <span
                      className={`absolute left-0 -bottom-1 w-0 h-[2px] bg-green-400 transition-all duration-300 group-hover:w-full`}
                    ></span>
                  </Link>
                ))
              : commonRoutes.map((item) => (
                  <Link
                    key={item}
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className={`relative ${linkColor} transition-colors group`}
                  >
                    {item}
                    <span
                      className={`absolute left-0 -bottom-1 w-0 h-[2px] bg-green-400 transition-all duration-300 group-hover:w-full`}
                    ></span>
                  </Link>
                ))}

            {/* ✅ Login/Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="ml-2 cursor-pointer px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to={isAdminRoute ? "/auth/admin-login" : "/auth/login"}
                className="ml-6 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* ✅ Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? (
                <HiX
                  size={28}
                  className={isHomeRoute ? "text-white" : "text-black"}
                />
              ) : (
                <HiMenu
                  size={28}
                  className={isHomeRoute ? "text-white" : "text-black"}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } ${isHomeRoute ? "bg-white/10 backdrop-blur-md" : "bg-white"}`}
      >
        <div className="px-6 pt-4 pb-6 space-y-4">
          {isLoggedIn && user?.role === "admin"
            ? adminRoutes.map((item) => (
                <Link
                  key={item}
                  to={
                    item === "Products"
                      ? "/admin/products"
                      : "/admin/add-product"
                  }
                  className={`block text-lg font-medium ${linkColor}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))
            : commonRoutes.map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={`block text-lg font-medium ${linkColor}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full cursor-pointer px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to={isAdminRoute ? "/auth/admin-login" : "/auth/login"}
              className="block w-full text-center px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
