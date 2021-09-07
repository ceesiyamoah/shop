import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
const CartItem = ({ onRemove, sum, title, quantity, deletable = true }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.qty}>{quantity}</Text>
        <Text style={styles.mainText}>{title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{sum.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity onPress={onRemove} style={styles.delete}>
            <Ionicons name='close-circle-outline' size={23} color='red' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  qty: {
    color: "#888",
    fontSize: 16,
    marginRight: 5,
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  delete: {
    marginLeft: 20,
  },
});
export default CartItem;
