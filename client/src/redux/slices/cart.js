import { createSlice } from "@reduxjs/toolkit";

const calculateSubtotal = (cartState) => {
  let result = 0;
  cartState.map((item) => (result += item.qty * item.price));

  return Number(result).toFixed(2);
};

const updateLocalStorage = (cart) => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
  localStorage.setItem("subtotal", JSON.stringify(calculateSubtotal(cart)));
};

export const initialState = {
  loading: false,
  errors: null,
  cart: JSON.parse(localStorage.getItem("cartItems")) ?? [],
  expressShipping: false,
  subtotal: JSON.parse(localStorage.getItem("cartItems"))
    ? calculateSubtotal(JSON.parse(localStorage.getItem("cartItems")))
    : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    cartItemAdd: (state, { payload }) => {
      const existingItem = state.cart.find((item) => item.id === payload.id);

      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === existingItem.id ? payload : item
        );
      } else {
        state.cart = [...state.cart, payload];
      }

      state.loading = false;
      state.errors = null;
      updateLocalStorage(state.cart);
      state.subtotal = calculateSubtotal(state.cart);
    },
    cartItemRemoval: (state, { payload }) => {
      state.cart = [...state.cart].filter((item) => item.id !== payload);
      updateLocalStorage(state.cart);
      state.subtotal = calculateSubtotal(state.cart);
      state.loading = false;
      state.errors = null;
    },
    setErrors: (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    },
  },
});

export const { setLoading, setErrors, cartItemAdd, cartItemRemoval } =
  cartSlice.actions;
export default cartSlice.reducer;
export const cartSelector = (state) => state.cart;
