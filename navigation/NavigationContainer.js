import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { NavigationActions } from "react-navigation";
import { useSelector } from "react-redux";
import ShopNavigator from "./ShopNavigator";

const NavigationContainer = () => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);
  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({
          routeName: "Auth",
        })
      );
    }
  }, [isAuth]);
  return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
