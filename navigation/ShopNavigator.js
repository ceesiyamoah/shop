import { Platform } from "react-native";
import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import colors from "../constants/colors";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
  headerTitleAlign: "center",
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: ({ focused, tintColor }) => (
        <Ionicons
          name={focused ? "cart" : "cart-outline"}
          size={23}
          color={tintColor}
        />
      ),
    },
    defaultNavigationOptions: {
      ...defaultNavOptions,
    },
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: ({ focused, tintColor }) => (
        <Ionicons
          name={focused ? "list" : "list-outline"}
          size={23}
          color={tintColor}
        />
      ),
    },
    defaultNavigationOptions: { ...defaultNavOptions },
  }
);
const UserProductsNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: ({ focused, tintColor }) => (
        <Ionicons
          name={focused ? "create" : "create-outline"}
          size={23}
          color={tintColor}
        />
      ),
    },
    defaultNavigationOptions: { ...defaultNavOptions },
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    "User Products": UserProductsNavigator,
  },
  {
    contentOptions: {
      activeTintColor: colors.primary,
    },
    hideStatusBar: false,
  }
);

export default createAppContainer(ShopNavigator);
