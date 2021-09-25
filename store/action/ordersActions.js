import { ADD_ORDER } from "../../types/types";

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
