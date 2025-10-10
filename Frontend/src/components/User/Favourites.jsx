import React, { useEffect } from "react";
import { useFavourites } from "../../context/favourites/FavouriteContext";
import { motion } from "framer-motion";
import { HeartOff } from "lucide-react";
import Loader from "../ui/Loader";
import { Navbar } from "../ui/Navbar";
import { FaHeartBroken } from "react-icons/fa";
export default function FavouritesPage() {
  const { favourites, loading, fetchFavourites, removeFavourite } =
    useFavourites();
  console.log(favourites);

  useEffect(() => {
    fetchFavourites();
  }, []);

  if (loading) return <Loader fullscreen={true} />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen my-18 bg-gray-50 py-10 px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Your Favourites
        </h1>

        {favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <HeartOff className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-500">No favourites yet. Add some!</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {favourites.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between hover:scale-[1.03] transition-transform duration-300"
              >
                <img
                  src={`http://localhost:3500${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-contain rounded-xl mb-3 bg-gray-50"
                />

                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-500 mb-2">
                  {product.description?.slice(0, 60)}...
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-green-600 font-medium">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => removeFavourite(product._id)}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <FaHeartBroken className="text-lg" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
