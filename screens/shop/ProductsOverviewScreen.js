import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/action/cartActions";

const ProductsOverviewScreen = ({ products, navigation, addToCart }) => {
  return (
    <View style={styles.screen}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductItem
            onViewDetail={() =>
              navigation.navigate("ProductDetail", {
                id: item.id,
                title: item.title,
              })
            }
            {...item}
            onAddToCart={() => {
              addToCart(item);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    // alignItems: 'center',
  },
  holder: {
    padding: 20,
  },
});

ProductsOverviewScreen.navigationOptions = () => {
  return {
    headerTitle: "All Products",
  };
};

const mapStateToProps = (state) => ({
  products: state.products.availableProducts,
});

const mapDispatchToProps = {
  addToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsOverviewScreen);
