import { ADD_TO_CART, DELETE_ALL_ITEMS } from "../../types/types";

export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });
export const deleteAllItems = () => ({ type: DELETE_ALL_ITEMS });
