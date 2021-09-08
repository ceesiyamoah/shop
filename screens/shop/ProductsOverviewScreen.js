import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import colors from "../../constants/colors";
import { addToCart } from "../../store/action/cartActions";

const ProductsOverviewScreen = ({ products, navigation, addToCart }) => {
  const onNavigate = (id, title) => {
    navigation.navigate("ProductDetail", {
      id,
      title,
    });
  };
  return (
    <View style={styles.screen}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductItem
            {...item}
            onSelect={() => onNavigate(item.id, item.title)}
          >
            <Button
              title='View Details'
              onPress={() => onNavigate(item.id, item.title)}
              color={colors.primary}
            />
            <Button
              title='To cart'
              onPress={() => {
                addToCart(item);
              }}
              color={colors.primary}
            />
          </ProductItem>
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
        <View>
          <Item
            title='Cart'
            iconName='cart'
            onPress={() => {
              navigation.navigate("Cart");
            }}
          />
        </View>
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <View>
          <Item
            title='Menu'
            iconName='menu-outline'
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </View>
      </HeaderButtons>
    ),
  };
};

const mapStateToProps = (state) => ({
  products: state.products.availableProducts,
  cartCount: Object.keys(state.cart.items).length,
});

const mapDispatchToProps = {
  addToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsOverviewScreen);
