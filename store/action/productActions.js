import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../../types/types";

export const deleteProduct = (id) => async (dispatch, getState) => {
  const response = await fetch(
    `https://native-guide-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json?auth=${
      getState().auth.token
    }`,
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

export const getProducts = () => async (dispatch, getState) => {
  try {
    const response = await fetch(
      "https://native-guide-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

    const loadedData = Object.keys(resData).map((item) => {
      const { title, description, imageUrl, price, ownerId } = resData[item];
      return new Product(item, ownerId, title, imageUrl, description, price);
    });
    dispatch({
      type: GET_PRODUCTS,
      payload: {
        loadedData,
        userProducts: loadedData.filter(
          (item) => item.ownerId === getState().auth.userId
        ),
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createProduct =
  ({ title, description, imageUrl, price }) =>
  async (dispatch, getState) => {
    const response = await fetch(
      `https://native-guide-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${
        getState().auth.token
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: getState().auth.userId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Could not create product");
    }

    const { name } = await response.json();
    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        id: name,
        title,
        description,
        imageUrl,
        price,
        ownerId: getState().auth.userId,
      },
    });
  };
export const updateProduct =
  ({ id, title, description, imageUrl }) =>
  async (dispatch, getState) => {
    const response = await fetch(
      `https://native-guide-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json?auth=${
        getState().auth.token
      }`,
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
