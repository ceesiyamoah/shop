import CartItem from "../../models/cart-item";
import { ToastAndroid } from "react-native";
import {
  ADD_ORDER,
  ADD_TO_CART,
  DELETE_ALL_ITEMS,
  DELETE_ITEM_FROM_CART,
  DELETE_PRODUCT,
} from "../../types/types";

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
      ToastAndroid.show("Cart Emptied", ToastAndroid.SHORT);
    case ADD_ORDER:
      return initialState;

    case DELETE_ITEM_FROM_CART:
      let updatedItems = {};
      const selectedId = state.items[payload];
      if (selectedId.quantity > 1) {
        const updatedCartItem = new CartItem(
          selectedId.quantity - 1,
          selectedId.price,
          selectedId.title,
          selectedId.sum - selectedId.price
        );
        updatedItems = { ...state.items, [payload]: updatedCartItem };
      } else {
        updatedItems = { ...state.items };
        delete updatedItems[payload];
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - selectedId.price,
      };

    case DELETE_PRODUCT:
      if (!state.items[payload]) return state;
      const newItems = { ...state.items };
      const itemTotal = state.items[payload].sum;

      delete newItems[payload];
      return {
        ...state,
        items: newItems,
        totalAmount: state.totalAmount - itemTotal,
      };

    default:
      return state;
  }
};
