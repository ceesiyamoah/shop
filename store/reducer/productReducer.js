import PRODUCTS from "../../data/dummy";
import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../../types/types";

const initialState = {
  availableProducts: [...PRODUCTS],
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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
      const { title, description, imageUrl, price } = payload;
      const newProd = new Product(
        new Date().toJSON(),
        "u1",
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
      // console.log(payload);
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
      console.log(updatedAvailProducts);
      return {
        ...state,
        availableProducts: updatedAvailProducts,
        userProducts: updatedUserProducts,
      };
    default:
      return state;
  }
};
