import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { connect } from "react-redux";
import colors from "../../constants/colors";
import { addToCart } from "../../store/action/cartActions";

const ProductDetailScreen = ({
  navigation,
  product: { ownerId, title, imageUrl, description, price, id },
  addToCart,
}) => {
  return (
    <ScrollView>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.button}>
        <Button
          color={colors.primary}
          title='Add to cart'
          onPress={() => {
            addToCart({ price, title, id });
          }}
        />
      </View>
      <Text style={styles.price}>$ {price.toFixed(2)}</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 400,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 10,
  },
  button: {
    alignItems: "center",
  },
});

const mapStateToProps = (state, { navigation }) => {
  return {
    product: state.products.availableProducts.find(
      (item) => item.id === navigation.getParam("id")
    ),
  };
};

const mapDispatchToProps = {
  addToCart,
};

ProductDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam("title"),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailScreen);
