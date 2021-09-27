import Order from "../../models/orders";
import { ADD_ORDER, GET_ORDERS } from "../../types/types";

export const addOrder = (cartItems, totalAmount) => async (dispatch) => {
  const date = new Date();
  const response = await fetch(
    "https://native-guide-default-rtdb.europe-west1.firebasedatabase.app/orders/u1.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString(),
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Could not create order");
  }

  const { name } = await response.json();

  dispatch({
    type: ADD_ORDER,
    payload: { id: name, items: cartItems, amount: totalAmount, date },
  });
};

export const getOrders = () => async (dispatch) => {
  const response = await fetch(
    "https://native-guide-default-rtdb.europe-west1.firebasedatabase.app/orders/u1.json"
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const resData = await response.json();

  const loadedData = Object.keys(resData).map((order) => {
    const { cartItems, date, totalAmount } = resData[order];
    return new Order(order, cartItems, totalAmount, new Date(date));
  });

  dispatch({
    type: GET_ORDERS,
    payload: loadedData,
  });
};
