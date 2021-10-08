import PRODUCTS from "../../data/dummy";
import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../../types/types";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return {
        availableProducts: [...payload.loadedData],
        userProducts: [...payload.userProducts],
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: [
          ...state.userProducts.filter((product) => product.id !== payload),
        ],
        availableProducts: [
          ...state.availableProducts.filter(
            (product) => product.id !== payload
          ),
        ],
      };

    case CREATE_PRODUCT:
      const { id, title, description, imageUrl, price, ownerId } = payload;
      const newProd = new Product(
        id,
        ownerId,
        title,
        imageUrl,
        description,
        price
      );
      return {
        ...state,
        availableProducts: [...state.availableProducts, newProd],
        userProducts: [...state.userProducts, newProd],
      };

    case UPDATE_PRODUCT:
      const toUpdateIndex = state.userProducts.findIndex(
        (item) => item.id === payload.id
      );
      const updatedProduct = new Product(
        state.userProducts[toUpdateIndex].id,
        state.userProducts[toUpdateIndex].ownerId,
        payload.title,
        payload.imageUrl,
        payload.description,
        state.userProducts[toUpdateIndex].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[toUpdateIndex] = updatedProduct;
      const availIndex = state.userProducts.findIndex(
        (item) => item.id === payload.id
      );
      const updatedAvailProducts = [...state.availableProducts];
      updatedAvailProducts[availIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailProducts,
        userProducts: updatedUserProducts,
      };
    default:
      return state;
  }
};
