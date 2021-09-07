import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import colors from "../../constants/colors";
import CartItem from "./CartItem";

const OrderItem = ({ totalAmount, items, date }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.total}>$ {Number(totalAmount).toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        color={colors.primary}
        title={`${showDetails ? "Hide" : "Show"} details`}
        onPress={() => {
          setShowDetails((cur) => !cur);
        }}
      />
      {showDetails && (
        <View style={styles.detailItem}>
          {items.map((el) => (
            <CartItem key={el.id} {...el} deletable={false} />
          ))}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  orderItem: {
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    padding: 10,
    margin: 20,
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  amount: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: "#888",
  },
  detailItem: {
    width: "100%",
  },
});
export default OrderItem;
