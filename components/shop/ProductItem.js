import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableNativeFeedback,
} from "react-native";
import colors from "../../constants/colors";
const ProductItem = ({ title, imageUrl, price, onViewDetail, onAddToCart }) => {
  return (
    <TouchableNativeFeedback onPress={onViewDetail} useForeground>
      <View style={styles.product}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>$ {price.toFixed(2)}</Text>
        <View style={styles.buttonHolder}>
          <Button
            title='View Details'
            onPress={onViewDetail}
            color={colors.primary}
          />
          <Button
            title='To cart'
            onPress={onAddToCart}
            color={colors.primary}
          />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
const styles = StyleSheet.create({
  product: {
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    height: 300,
    margin: 20,
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    height: "60%",
    width: "100%",
  },
  buttonHolder: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    marginVertical: 3,
  },
  price: {
    color: "#888",
    fontSize: 14,
  },
});
export default ProductItem;
