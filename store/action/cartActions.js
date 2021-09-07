import {
  ADD_TO_CART,
  DELETE_ALL_ITEMS,
  DELETE_ITEM_FROM_CART,
} from "../../types/types";

export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });
export const deleteAllItems = () => ({ type: DELETE_ALL_ITEMS });
export const deleteItem = (id) => ({
  type: DELETE_ITEM_FROM_CART,
  payload: id,
});
