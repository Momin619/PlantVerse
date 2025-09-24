import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLeaf } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-700 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo / About */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <FaLeaf className="text-3xl text-green-200" />
            <h2 className="text-2xl font-extrabold tracking-wide">PlantShop</h2>
          </div>
          <p className="text-gray-200 leading-relaxed">
            Your one-stop online store for plants, pots, and gardening supplies.
            Bring nature into your home with just a click.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            {["Home", "Products", "Cart", "About"].map((item) => (
              <li key={item}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="relative hover:text-green-200 transition-colors group"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-200 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-200">support@plantshop.com</p>
          <p className="text-gray-200">+92 300 1234567</p>
          <p className="text-gray-200 mb-4">Bahria Town, Pakistan</p>

          <div className="flex space-x-4 mt-2">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-400 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-400 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-400 transition-colors"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-green-800 text-center py-4 text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} PlantShop. All rights reserved.
      </div>
    </footer>
  );
};
