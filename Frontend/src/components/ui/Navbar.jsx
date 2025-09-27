import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useUser } from "../../context/UserContext";
import { api } from "../../services/api/api";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useUser();
  const navigate = useNavigate();

  // 🔑 Logout handler
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      setIsLoggedIn(false);
      navigate("/auth/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/10 backdrop-blur-md border-b border-white/20 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-white tracking-wide hover:scale-105 transition-transform"
          >
            <span className="text-green-500">Plant</span>Verse
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-lg font-medium items-center">
            {["Home", "Products", "Cart", "About"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative text-white hover:text-green-200 transition-colors group"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Show Logout if logged in, otherwise Login */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth/login"
                className="ml-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-white"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white/10 backdrop-blur-md text-white border-t border-white/20 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pt-4 pb-6 space-y-4">
          {["Home", "Products", "Cart", "About"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="block text-lg font-medium hover:text-green-300 transition-colors"
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
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth/login"
              className="block w-full text-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
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
