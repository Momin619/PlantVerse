import { useContext, createContext, useEffect, useReducer } from "react";
import { api } from "../../services/api/api";
import { favouriteReducer, initialState } from "./favouriteReducer.js";

const FavouritesContext = createContext();

export default function FavouriteProvider({ children }) {
  const [state, dispatch] = useReducer(favouriteReducer, initialState);

  // 🧠 Fetch favourites once on mount
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        dispatch({ type: "LOADING" });
        const res = await api.get("/favourites", { withCredentials: true });
        dispatch({ type: "SET_FAVOURITES", payload: res.data.favourites });
      } catch (error) {
        console.error("Failed to fetch favourites:", error);
      } finally {
        dispatch({ type: "DONE_LOADING" });
      }
    };
    fetchFavourites();
  }, []);

  // 🟢 Add favourite (instant update)
  const addFavourite = async (productId) => {
    try {
      const res = await api.post(
        `/favourite-product/product/${productId}`,
        {},
        { withCredentials: true }
      );

      // ✅ Update state instantly (no need to refetch)
      dispatch({
        type: "ADD_FAVOURITE",
        payload: res.data.product || { _id: productId }, // fallback
      });
    } catch (error) {
      console.error("Add favourite error:", error);
    }
  };

  // 🔴 Remove favourite (instant update)
  const removeFavourite = async (productId) => {
    try {
      await api.delete(`/remove-favourite/favourite/${productId}`, {
        withCredentials: true,
      });

      // ✅ Remove immediately from UI
      dispatch({
        type: "REMOVE_FAVOURITE",
        payload: productId,
      });
    } catch (error) {
      console.error("Remove favourite error:", error);
    }
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites: state.favourites,
        loading: state.loading,
        addFavourite,
        removeFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}
