import React from "react";

import { api } from "../../services/api/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function ProductDetails() {
  const [product, setProduct] = useState({});

  const { id } = useParams();
  const fetchProduct = async () => {
    try {
      const res = await api.get(`/product-detail/product/${id}`);
      const product = res.data.product;
      setProduct(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <div className="max-w-4xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
        <img
          src={`http://localhost:3500${product.image}`}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-6">${product.price}</p>
        <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          Add to Cart
        </button>
      </div>
    </>
  );
}
