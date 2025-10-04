import React from "react";
import { api } from "../../services/api/api";
import { useState, useEffect } from "react";
import Loader from "../ui/Loader";
import { Navbar } from "../ui/Navbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/products");
      const products = res.data.products;
      console.log(products);
      setProducts(products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loader fullscreen={true} />;

  return (
    <>
      <Navbar />
      <div className="p-6  bg-gray-100 min-h-screen">
        <h2 className="text-3xl my-15 font-bold mb-6 text-center text-gray-800">
          Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products found</p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="relative bg-white shadow-md hover:shadow-2xl 
                       rounded-2xl p-5 flex flex-col justify-between 
                       transition-transform duration-300 hover:scale-105"
              >
                {/* Favorite Button */}
                <button
                  className="absolute top-3 right-3 p-2 rounded-full bg-white shadow 
                         hover:bg-red-100 transition"
                  onClick={() =>
                    toast.info(`${product.name} added to favorites!`)
                  }
                >
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 
                     0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 
                     0 00-6.364 0z"
                    />
                  </svg>
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
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
