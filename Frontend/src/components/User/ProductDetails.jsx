import Loader from "../ui/Loader";
import { api } from "../../services/api/api";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FiHeart, FiSearch, FiShoppingCart } from "react-icons/fi";
import useCart from "../../hooks/cart/useCart"; // ✅ useCart hook
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetails() {
  const imageRef = useRef();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { addToCart } = useCart(); // ✅ get addToCart

  // 🔍 Image Zoom
  const zoomImage = () => {
    if (imageRef.current) {
      imageRef.current.classList.toggle("scale-110");
    }
  };

  // 📦 Fetch product details
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/product-detail/product/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  // 🛒 Handle Add to Cart
  const handleAddToCart = async () => {
    try {
      await addToCart(product._id);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart 😞");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) return <Loader fullscreen={true} />;

  return (
    <div className="max-w-5xl mx-auto my-12 p-6 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image Section */}
        <div className="relative group">
          <div className="w-full h-96 overflow-hidden rounded-xl bg-gray-100 shadow-md transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
            <img
              src={`http://localhost:3500${product.image}`}
              alt={product.name}
              ref={imageRef}
              className="w-full h-full object-contain p-4"
            />
          </div>

          {/* Floating Icons */}
          <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition">
            <button className="cursor-pointer p-2 bg-white rounded-full shadow hover:bg-red-100 transition">
              <FiHeart className="w-6 h-6 text-red-500" />
            </button>
            <button
              onClick={zoomImage}
              className="cursor-pointer p-2 bg-white rounded-full shadow hover:bg-blue-100 transition"
            >
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

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg shadow-md bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105 transition"
          >
            <FiShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
