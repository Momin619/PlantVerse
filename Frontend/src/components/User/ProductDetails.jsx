import Loader from "../ui/Loader";
import { api } from "../../services/api/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
    <>
      <div className="max-w-5xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <img
            src={`http://localhost:3500${product.image}`}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-semibold mb-2">
              Price: ${product.price}
            </p>
            <p className="text-gray-700 mb-2">Stock: {product.stock}</p>
            <p className="text-gray-700 mb-2">Type: {product.type}</p>
            <p className="text-gray-700 mb-6">Category: {product.category}</p>

            <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
