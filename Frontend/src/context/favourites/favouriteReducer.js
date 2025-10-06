export const initialState = {
  favourites: [],
  loading: false,
};

export function favouriteReducer(state, action) {
  switch (action.type) {
    case "SET_FAVOURITES":
      return { ...state, favourites: action.payload };
    case "ADD_FAVOURITE":
      return { ...state, favourites: [...state.favourites, action.payload] };
    case "REMOVE_FAVOURITE":
      return {
        ...state,
        favourites: state.favourites.filter(
          (fav) => fav._id !== action.payload
        ),
      };
    case "LOADING":
      return { ...state, loading: true };
    case "DONE_LOADING":
      return { ...state, loading: false };
  }
}
