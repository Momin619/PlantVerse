import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useUser } from "../../context/UserContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user } = useUser();
  const navigate = useNavigate();

  // 🔑 Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/signup");
    }
  }, [isLoggedIn, navigate]);

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
          <div className="hidden md:flex space-x-8 text-lg font-medium">
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
        </div>
      </div>
    </nav>
  );
};
