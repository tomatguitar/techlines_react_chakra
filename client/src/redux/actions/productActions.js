import axios from "axios";
import { setProducts, setErrors, setLoading } from "../slices/products";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/products");
    dispatch(setLoading());
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
