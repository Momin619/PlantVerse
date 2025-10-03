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
      <div className="p-6 my-10 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products found</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md hover:shadow-xl rounded-2xl p-5 flex flex-col justify-between transition duration-300"
              >
                {/* Image */}
                {product.image && (
                  <img
                    src={`http://localhost:3500${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
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

                {/* Button */}
                <Link
                  to={`/product-detail/product/${product._id}`}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
