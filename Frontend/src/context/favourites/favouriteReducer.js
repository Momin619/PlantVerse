export const initialState = {
  favourites: [],
  loading: false,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FAVOURITES":
      return { ...state, favourites: action.payload };
    case "ADD_FAVOURITES":
      if (state.favourites.some((fav) => fav._id === action.payload._id)) {
        return state; // prevent duplicate
      }
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };

    case "REMOVE_FAVOURITE":
      return {
        ...state,
        favourites: state.favourites.filter(
          (fav) => fav._id !== action.payload
        ),
      };
    case "SET_LOADING_TRUE":
      return { ...state, loading: true };
    case "SET_LOADING_FALSE":
      return { ...state, loading: false };
  }
};
