import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../../types/types";

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  payload: id,
});

export const createProduct = ({ title, description, imageUrl, price }) => ({
  type: CREATE_PRODUCT,
  payload: { title, description, imageUrl, price },
});
export const updateProduct = ({ id, title, description, imageUrl }) => ({
  type: UPDATE_PRODUCT,
  payload: { id, title, description, imageUrl },
});
