import { useContext, createContext, useEffect, useReducer } from "react";
import { api } from "../../services/api/api";
import { favouriteReducer, initialState } from "./favouriteReducer.js";

const FavouritesContext = createContext();

export default function FavouriteProvider({ children }) {
  const [state, dispatch] = useReducer(favouriteReducer, initialState);
  useEffect(() => {
    async function fetchFavourites() {
      try {
        dispatch({ type: "LOADING" });
        const res = await api.get("/favourites", {
          withCredentials: true,
        });
        dispatch({ type: "SET_FAVOURITES", payload: res.data.favourites });
      } catch (error) {
        console.error("Failed to fetch favourites:", error);
      } finally {
        dispatch({ type: "DONE_LOADING" });
      }
    }
    fetchFavourites();
  }, []);

  const addFavourite = async (productId) => {
    try {
      const res = await api.post(
        `/favourite-product/product/${productId}`,
        {},
        { withCredentials: true }
      );
      dispatch({
        type: "SET_FAVOURITES",
        payload: res.data.favourites,
      });
    } catch (error) {
      console.error("Add favourite error:", error);
    }
  };

  // ✅ Remove favourite
  const removeFavourite = async (productId) => {
    try {
      const res = await api.delete(
        `/api/remove-favourite/favourite/${productId}`,
        { withCredentials: true }
      );
      dispatch({
        type: "SET_FAVOURITES",
        payload: res.data.favourites,
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
