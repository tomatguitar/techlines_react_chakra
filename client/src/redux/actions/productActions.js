import axios from "axios";
import {
  setProduct,
  setProducts,
  setErrors,
  setLoading,
} from "../slices/products";

export const getProducts = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.get("api/products");
    dispatch(setProducts(data));
  } catch (error) {
    dispatch(
      setErrors(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected message has occured please try again later"
      )
    );
  }
};

export const getProduct = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`${window.location.origin}/api/products/${id}`);
    dispatch(setProduct(data));
  } catch (error) {
    dispatch(
      setErrors(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected message has occured please try again later"
      )
    );
  }
};
