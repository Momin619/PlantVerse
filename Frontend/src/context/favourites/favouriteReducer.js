export const initialState = {
  favourites: [],
  loading: false,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FAVOURITES":
      return { ...state, favourites: action.payload };

    case "ADD_FAVOURITE":
      if (state.favourites.includes(action.payload)) return state;
      return { ...state, favourites: [...state.favourites, action.payload] };

    case "REMOVE_FAVOURITE":
      return {
        ...state,
        favourites: state.favourites.filter(
          (id) => id !== action.payload && id._id !== action.payload
        ),
      };

    case "SET_LOADING_TRUE":
      return { ...state, loading: true };

    case "SET_LOADING_FALSE":
      return { ...state, loading: false };

    default:
      return state;
  }
};
