import Order from "../../models/orders";
import { ADD_ORDER } from "../../types/types";

const initialState = {
  orders: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ORDER:
      const { items, amount } = payload;
      return {
        ...state,
        orders: [
          ...state.orders,
          new Order(new Date().toString(), items, amount, new Date()),
        ],
      };

    default:
      return state;
  }
};
