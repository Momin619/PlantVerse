import { useEffect, useContext, createContext, useReducer } from "react";
import { api } from "../../services/api/api";
export const FavouriteContext = createContext();
import { initialState, formReducer } from "./favouriteReducer.js";

export default function FavouriteProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const fetchFavourites = async () => {
    dispatch({ type: "SET_LOADING_TRUE" });
    try {
      const res = await api.get("/favourites");
      const favourites = res.data.favourites;
      dispatch({ type: "SET_FAVOURITES", payload: favourites });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_LOADING_FALSE" });
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const addFavourite = async (id) => {
    const fakeFavourite = { _id: id };
    dispatch({ type: "ADD_FAVOURITES", payload: fakeFavourite });
    try {
      const res = await api.post(`/favourite-product/product/${id}`);
      const favourite = res?.data?.favourites;
      if (favourite && favourite._id) {
        dispatch({ type: "ADD_FAVOURITES", payload: favourite });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeFavourite = async (id) => {
    // Optimistic UI update (remove instantly)
    const previousFavourites = [...state.favourites];
    dispatch({ type: "REMOVE_FAVOURITE", payload: id });

    try {
      const res = await api.delete(`/remove-favourite/favourite/${id}`);
      if (res.status !== 200) {
        throw new Error("Failed to remove from server");
      }
    } catch (error) {
      console.error("Error removing favourite:", error);

      // Rollback only if the server truly failed
      dispatch({ type: "SET_FAVOURITES", payload: previousFavourites });
    }
  };

  return (
    <FavouriteContext.Provider
      value={{
        ...state,
        fetchFavourites,
        addFavourite,
        removeFavourite,
      }}
    >
      {" "}
      {children}{" "}
    </FavouriteContext.Provider>
  );
}

export const useFavourites = () => useContext(FavouriteContext);
