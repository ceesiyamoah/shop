import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
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

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "All Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName='cart'
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
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
