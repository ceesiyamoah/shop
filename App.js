import React from "react";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ShopNavigator from "./navigation/ShopNavigator";
import cartReducer from "./store/reducer/cartReducer";
import productReducer from "./store/reducer/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import ordersReducer from "./store/reducer/ordersReducer";
import reduxThunk from "redux-thunk";
import authReducer from "./store/reducer/authReducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

//! Remove composeWithDevTools before deployment
const store = createStore(
  rootReducer,
  composeWithDevTools(),
  applyMiddleware(reduxThunk)
);

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
