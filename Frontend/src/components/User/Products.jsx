import React, { useState, useEffect } from "react";
import { api } from "../../services/api/api";
import Loader from "../ui/Loader";
import { Navbar } from "../ui/Navbar";
import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { useFavourites } from "../../context/favourites/FavouriteContext";

export default function Products() {
  const { favourites, addFavourite, removeFavourite, loading } =
    useFavourites();

  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);

  const fetchProducts = async () => {
    setProductLoading(true);
    try {
      const res = await api.get("/admin/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setProductLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (productLoading || loading) return <Loader fullscreen={true} />;

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products found</p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => {
              const isFavourite = favourites.some((f) => f._id === product._id);

              return (
                <div
                  key={product._id}
                  className="relative bg-white shadow-md hover:shadow-2xl 
                           rounded-2xl p-5 flex flex-col justify-between 
                           transition-transform duration-300 hover:scale-105"
                >
                  {/* Favourite Button */}
                  <button
                    onClick={() =>
                      isFavourite
                        ? removeFavourite(product._id)
                        : addFavourite(product._id)
                    }
                    className={`absolute top-3 right-3 p-2 rounded-full shadow transition ${
                      isFavourite ? "bg-red-100" : "bg-white hover:bg-red-50"
                    }`}
                  >
                    <FiHeart
                      className={`w-6 h-6 transition ${
                        isFavourite ? "text-red-500" : "text-gray-400"
                      }`}
                    />
                  </button>

                  {/* Image */}
                  {product.image && (
                    <img
                      src={`http://localhost:3500${product.image}`}
                      alt={product.name}
                      className="w-full h-48 object-contain rounded-xl mb-4 bg-gray-100"
                    />
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-green-600 font-bold text-lg mb-4">
                      Rs. {product.price}
                    </p>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/product-detail/product/${product._id}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 
                               rounded-lg bg-gradient-to-r from-green-500 to-green-600 
                               text-white font-medium transition-all duration-300 
                               hover:from-green-600 hover:to-green-700 hover:translate-x-1 shadow-md"
                  >
                    <span>View Details</span>
                    <FiArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
