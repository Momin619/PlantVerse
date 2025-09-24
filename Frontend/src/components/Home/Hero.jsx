import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import heroImage from "../../assets/images/Home/hero1.avif";

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center lg:text-left w-full max-w-4xl px-6 flex flex-col items-center lg:items-start justify-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-snug sm:leading-tight mb-4 sm:mb-6">
          Bring Nature <br />
          <span className="text-green-400">Into Your Home</span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-xl">
          Explore our curated collection of indoor and outdoor plants to create
          your own green sanctuary. Healthy, fresh, and delivered to your
          doorstep.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to="/shop"
            className="flex items-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-full
            shadow-lg border-2 border-transparent
            transition-all duration-300 transform hover:scale-105
            hover:shadow-[0_0_20px_#22c55e] hover:border-green-400 w-full sm:w-auto justify-center text-base sm:text-lg"
          >
            <ShoppingCart className="w-5 h-5" /> Shop Now
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 rounded-full border-2 border-green-400 text-green-400 font-semibold
            transition-all duration-300 w-full sm:w-auto text-center
            hover:shadow-[0_0_20px_#22c55e] hover:border-green-400 hover:text-white hover:bg-green-500 text-base sm:text-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
