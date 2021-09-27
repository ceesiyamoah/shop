import Order from "../../models/orders";
import { ADD_ORDER, GET_ORDERS } from "../../types/types";

const initialState = {
  orders: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: [...payload],
      };

    case ADD_ORDER:
      const { items, amount, id, date } = payload;
      return {
        ...state,
        orders: [...state.orders, new Order(id, items, amount, date)],
      };

    default:
      return state;
  }
};
