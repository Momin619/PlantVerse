import React, { useEffect } from "react";
import useCart from "../../hooks/cart/useCart";

export default function Cart() {
  const {
    cart,
    totalPrice,
    loading,
    error,
    fetchCart,
    removeFromCart,
    clearCart,
  } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-lg">
        Loading your cart...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 text-white">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20">
        <h1 className="text-3xl font-semibold mb-6 text-center">Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-300">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:3500${item.product.image}`}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover border border-white/20"
                    />
                    <div>
                      <h2 className="text-lg font-medium">
                        {item.product.name}
                      </h2>
                      <p className="text-gray-300">₨ {item.product.price}</p>
                      <p className="text-sm text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="bg-red-500/70 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-8 border-t border-white/20 pt-4">
              <h2 className="text-xl font-semibold">
                Total: <span className="text-green-400">₨ {totalPrice}</span>
              </h2>
              <button
                onClick={clearCart}
                className="bg-gradient-to-r from-red-500 to-pink-500 px-5 py-2 rounded-xl font-medium hover:scale-105 transition-transform shadow-md"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
