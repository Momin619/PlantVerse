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

  const handleDeleteProduct = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/admin/delete-product/product/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete Product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

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
                  to={`/admin/edit-product/product/${product._id}`}
                  className="w-full text-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white 
                   shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:ring-offset-1 transition"
                >
                  Edit Product
                </Link>
                <button
                  onClick={() => {
                    handleDeleteProduct(product._id);
                  }}
                  className=" cursor-pointer w-full my-5 text-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white 
                   shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 
                   focus:ring-offset-1 transition"
                >
                  Delete Product
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
