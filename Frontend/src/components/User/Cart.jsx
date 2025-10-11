import React, { useEffect } from "react";
import useCart from "../../hooks/cart/useCart";
import { FiPlus, FiMinus, FiTrash2, FiShoppingCart } from "react-icons/fi";
import Loader from "../ui/Loader";

export default function Cart() {
  const {
    cart,
    totalPrice,
    loading,
    error,
    fetchCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) return <Loader fullscreen={true} />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 text-gray-800">
      <div className="w-full max-w-4xl bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-200">
        {/* 🛒 Title */}
        <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-800">
          <FiShoppingCart className="w-7 h-7 text-green-600" />
          Cart
        </h1>

        {/* 🧺 Empty State */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <p className="text-lg font-medium">Your cart is empty</p>
          </div>
        ) : (
          <>
            {/* 🛍 Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-100 p-4 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={`http://localhost:3500${item.product.image}`}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover border border-gray-200 shadow-sm"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.product.name}
                      </h2>
                      <p className="text-gray-600">
                        ₨ {item.product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, "decrease")
                      }
                      className="p-2 cursor-pointer bg-gray-200 rounded-lg hover:bg-gray-300 transition active:scale-95"
                      title="Decrease"
                    >
                      <FiMinus />
                    </button>

                    <span className="text-lg font-medium w-6 text-center text-gray-700">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, "increase")
                      }
                      className="p-2 bg-gray-200 cursor-pointer rounded-lg hover:bg-gray-300 transition active:scale-95"
                      title="Increase"
                    >
                      <FiPlus />
                    </button>

                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="p-2 bg-red-100 cursor-pointer text-red-600 rounded-lg hover:bg-red-200 transition active:scale-95"
                      title="Remove"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 💰 Total + Clear Cart */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 border-t border-gray-200 pt-4 gap-4">
              <h2 className="text-xl font-semibold">
                Total:{" "}
                <span className="text-green-600 font-bold">
                  ₨ {totalPrice.toLocaleString()}
                </span>
              </h2>

              <button
                onClick={clearCart}
                className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-medium hover:from-red-600 hover:to-red-700 hover:shadow-lg active:scale-95 transition-all"
              >
                <FiTrash2 className="w-5 h-5" />
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
