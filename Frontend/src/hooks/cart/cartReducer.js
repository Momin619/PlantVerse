export const initialState = {
  cart: [],
  loading: false,
  error: null,
  totalPrice: 0,
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        cart: action.payload.items,
        totalPrice: action.payload.totalPrice,
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload.items,
        totalPrice: action.payload.totalPrice,
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: action.payload.items,
        totalPrice: action.payload.totalPrice,
      };
    case "CLEAR_CART":
      return { ...state, cart: [], totalPrice: 0 };
    default:
      return state;
  }
};
