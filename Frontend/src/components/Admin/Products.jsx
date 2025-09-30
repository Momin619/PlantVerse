import React from "react";
import { api } from "../../services/api/api";
import { useState, useEffect } from "react";
import Loader from "../ui/Loader";
import { Navbar } from "../ui/Navbar";
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
                className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition duration-300"
              >
                {product.image && (
                  <img
                    src={`http://localhost:3500${product.image}`}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-green-600 font-bold">Rs. {product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
