import { createContext, useReducer, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api/api";
import { initialState, formReducer } from "./favouriteReducer";

export const FavouriteContext = createContext();

export default function FavouriteProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // 🔹 Fetch favourites from backend
  const fetchFavourites = async () => {
    dispatch({ type: "SET_LOADING_TRUE" });
    try {
      const res = await api.get("/favourites");
      const favourites = res.data.favourites.map((f) =>
        typeof f === "object" ? f._id : f
      );
      dispatch({ type: "SET_FAVOURITES", payload: favourites });
    } catch (error) {
      console.log("Fetch Favourites Error:", error);
    } finally {
      dispatch({ type: "SET_LOADING_FALSE" });
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  // 🔹 Add favourite
  const addFavourite = async (id) => {
    try {
      dispatch({ type: "ADD_FAVOURITE", payload: id });
      toast.success("Added to favourites");
      await api.post(`/favourite-product/product/${id}`);
    } catch (error) {
      console.log("Add Favourite Error:", error);
      toast.error("Failed to add favourite");
    }
  };

  // 🔹 Remove favourite
  const removeFavourite = async (id) => {
    try {
      dispatch({ type: "REMOVE_FAVOURITE", payload: id });
      toast.info("Removed from favourites");
      await api.delete(`/remove-favourite/favourite/${id}`);
    } catch (error) {
      console.log("Remove Favourite Error:", error);
      toast.error("Failed to remove favourite");
    }
  };

  return (
    <FavouriteContext.Provider
      value={{
        favourites: state.favourites,
        loading: state.loading,
        fetchFavourites,
        addFavourite,
        removeFavourite,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
}

export const useFavourites = () => useContext(FavouriteContext);
