import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../../types/types";

export const deleteProduct = (id) => async (dispatch) => {
  await fetch(
    `https://native-guide-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Could not delete product");
  }

  dispatch({
    type: DELETE_PRODUCT,
    payload: id,
  });
};

export const getProducts = () => async (dispatch) => {
  try {
    const response = await fetch(
      "https://native-guide-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

    const loadedData = Object.keys(resData).map((item) => {
      const { title, description, imageUrl, price } = resData[item];
      return new Product(item, "u1", title, imageUrl, description, price);
    });

    dispatch({ type: GET_PRODUCTS, payload: loadedData });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createProduct =
  ({ title, description, imageUrl, price }) =>
  async (dispatch) => {
    const response = await fetch(
      "https://native-guide-default-rtdb.europe-west1.firebasedatabase.app/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageUrl, price }),
      }
    );

    if (!response.ok) {
      throw new Error("Could not create product");
    }

    const { name } = await response.json();
    dispatch({
      type: CREATE_PRODUCT,
      payload: { id: name, title, description, imageUrl, price },
    });
  };
export const updateProduct =
  ({ id, title, description, imageUrl }) =>
  async (dispatch) => {
    const response = await fetch(
      `https://native-guide-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageUrl }),
      }
    );

    if (!response.ok) {
      throw new Error("Could not update product");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      payload: { id, title, description, imageUrl },
    });
  };
