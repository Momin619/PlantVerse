import Loader from "../ui/Loader";
import { api } from "../../services/api/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiHeart, FiSearch, FiShoppingCart } from "react-icons/fi";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/product-detail/product/${id}`);
      const product = res.data.product;
      console.log(product);

      setProduct(product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) return <Loader fullscreen={true} />;

  return (
    <div className="max-w-5xl mx-auto my-12 p-6 bg-white shadow-xl rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image Section */}
        <div className="relative group">
          <div className="w-full h-96 overflow-hidden rounded-xl bg-gray-100 shadow-md transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
            <img
              src={`http://localhost:3500${product.image}`}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          </div>

          {/* Floating Icons */}
          <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition">
            {/* Favorite Button */}
            <button className="p-2 bg-white rounded-full shadow hover:bg-red-100 transition">
              <FiHeart className="w-6 h-6 text-red-500" />
            </button>

            {/* Zoom Button */}
            <button className="p-2 bg-white rounded-full shadow hover:bg-blue-100 transition">
              <FiSearch className="w-6 h-6 text-blue-500" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-2 mb-6">
            <p className="text-xl font-semibold">
              Price: <span className="text-green-600">${product.price}</span>
            </p>
            <p className="text-gray-700">Stock: {product.stock}</p>
            <p className="text-gray-700">Type: {product.type}</p>
            <p className="text-gray-700">Category: {product.category}</p>
          </div>

          {/* Add to Cart */}
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow-md hover:from-green-600 hover:to-green-700 hover:scale-105 transition">
            <FiShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
