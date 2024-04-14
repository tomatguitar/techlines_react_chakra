import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  errors: null,
  products: [],
  product: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProduct: (state, { payload }) => {
      state.loading = false;
      state.errors = null;
      state.product = payload;
    },
    setProducts: (state, { payload }) => {
      state.loading = false;
      state.errors = null;
      state.products = payload;
    },
    setErrors: (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    },
  },
});

export const { setLoading, setErrors, setProducts, setProduct } = productSlice.actions;
export default productSlice.reducer;
export const productsSelector = (state) => state.products;
