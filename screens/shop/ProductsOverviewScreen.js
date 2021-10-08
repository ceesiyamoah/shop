import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
  Text,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import colors from "../../constants/colors";
import { addToCart } from "../../store/action/cartActions";
import { getProducts } from "../../store/action/productActions";

const ProductsOverviewScreen = ({
  products,
  navigation,
  addToCart,
  getProducts,
}) => {
  const getData = useCallback(() => {
    setIsLoading(true);
    setRefresh(true);
    setError("");
    getProducts()
      .then((res) => {
        setIsLoading(false);
        setRefresh(false);
      })
      .catch((err) => {
        setError(err.message);
        setRefresh(false);
      });
  }, [setIsLoading, setError, setRefresh, getProducts]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const willFocusSub = navigation.addListener("willFocus", getData);
    return () => {
      willFocusSub.remove();
    };
  }, [getData]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const onNavigate = (id, title) => {
    navigation.navigate("ProductDetail", {
      id,
      title,
    });
  };

  if (error)
    return (
      <ScrollView
        contentContainerStyle={styles.screen}
        refreshControl={
          <RefreshControl onRefresh={getData} refreshing={refresh} />
        }
      >
        <Text style={styles.text}>
          Sorry, An error occurred. Pull down to try again
        </Text>
      </ScrollView>
    );

  if (isLoading)
    return (
      <View style={styles.screen}>
        <ActivityIndicator size={50} color={colors.primary} />
      </View>
    );
  if (!isLoading && !products.length)
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>No products yet</Text>
      </View>
    );
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
  text: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
    paddingHorizontal: 20,
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
  getProducts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsOverviewScreen);
