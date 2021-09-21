import React from "react";
import { View, StyleSheet, Text } from "react-native";
const Card = ({ children, style }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};
const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
});
export default Card;
