import CartItem from "../../models/cart-item";
import { ADD_TO_CART, DELETE_ALL_ITEMS } from "../../types/types";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      const { price, title, id } = payload;
      let cartItemToAdd;
      if (state.items[id]) {
        cartItemToAdd = new CartItem(
          state.items[id].quantity + 1,
          price,
          title,
          state.items[id].sum + price
        );
      } else {
        cartItemToAdd = new CartItem(1, price, title, price);
      }

      return {
        ...state,
        items: {
          ...state.items,
          [id]: cartItemToAdd,
        },
        totalAmount: state.totalAmount + price,
      };

    case DELETE_ALL_ITEMS:
      return {
        ...state,
        totalAmount: 0,
        items: {},
      };

    default:
      return state;
  }
};
