import axios from "axios";
import { cartItemAdd, cartItemRemoval, setErrors, setLoading } from "../slices/cart";

export const addCartItem = (id, qty = 1) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`api/products/${id}`);
    const itemToAdd = {
        id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        stock: data.stock,
        qty
    }
    dispatch(cartItemAdd(itemToAdd));
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

export const removeCartItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(cartItemRemoval(id));
};
