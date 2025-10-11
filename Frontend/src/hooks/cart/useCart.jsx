import { useReducer, useCallback } from "react";
import { cartReducer, initialState } from "./cartReducer";
import { api } from "../../services/api/api";

export default function useCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // 🧭 Fetch cart
  const fetchCart = useCallback(async () => {
    try {
      dispatch({ type: "FETCH_START" });
      const { data } = await api.get("/cart", { withCredentials: true });
      dispatch({ type: "FETCH_SUCCESS", payload: data.cart });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload: error.response?.data?.message || error.message,
      });
    }
  }, []);

  // 🛒 Add to cart
  const addToCart = useCallback(async (productId) => {
    try {
      const { data } = await api.post(
        `/add-to-cart/${productId}`,
        {},
        { withCredentials: true }
      );
      dispatch({ type: "ADD_TO_CART", payload: data.cart });
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  }, []);

  // ❌ Remove item
  const removeFromCart = useCallback(
    async (productId) => {
      dispatch({
        type: "REMOVE_ITEM",
        payload: {
          items: state.cart.filter((item) => item.product._id !== productId),
          totalPrice:
            state.totalPrice -
            (state.cart.find((i) => i.product._id === productId)?.product
              .price || 0),
        },
      });

      try {
        await api.delete(`/remove-from-cart/${productId}`, {
          withCredentials: true,
        });
        fetchCart(); // optional if you want to re-sync
      } catch (error) {
        console.error("Remove from cart failed:", error);
        fetchCart(); // rollback if needed
      }
    },
    [state.cart, state.totalPrice]
  );

  // ⬆⬇ Update Quantity
  const updateQuantity = useCallback(async (productId, action) => {
    try {
      const { data } = await api.patch(
        `/update-quantity/${productId}`,
        { action },
        { withCredentials: true }
      );
      dispatch({ type: "FETCH_SUCCESS", payload: data.cart }); // reuse
    } catch (error) {
      console.error("Quantity update failed:", error);
    }
  }, []);

  // 🗑 Clear cart
  const clearCart = useCallback(async () => {
    try {
      await api.delete("/clear-cart", { withCredentials: true });
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Clear cart failed:", error);
    }
  }, []);

  return {
    cart: state.cart,
    totalPrice: state.totalPrice,
    loading: state.loading,
    error: state.error,
    fetchCart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  };
}
