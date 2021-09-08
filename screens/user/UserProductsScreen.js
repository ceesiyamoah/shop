import React from "react";
import { View, StyleSheet, Button, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import colors from "../../constants/colors";
import { deleteProduct } from "../../store/action/productActions";

const UserProductsScreen = ({ userProducts, deleteProduct, navigation }) => {
  const onHandleEdit = (id) => {
    navigation.navigate("EditProduct", {
      id,
    });
  };
  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem
          {...item}
          onSelect={() => {
            onHandleEdit(item.id);
          }}
        >
          <Button
            title='Edit'
            onPress={() => {
              onHandleEdit(item.id);
            }}
            color={colors.primary}
          />
          <Button
            title='Delete'
            onPress={() => {
              deleteProduct(item.id);
            }}
            color={colors.primary}
          />
        </ProductItem>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
const styles = StyleSheet.create({});

UserProductsScreen.navigationOptions = ({ navigation }) => {
  return {
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <View>
          <Item
            title='Add Product'
            iconName='add-circle-outline'
            onPress={() => {
              navigation.navigate("EditProduct");
            }}
          />
        </View>
      </HeaderButtons>
    ),
    headerTitle: "Your Products",
  };
};

const mapStateToProps = (state) => ({
  userProducts: state.products.userProducts,
});

const mapDispatchToProps = {
  deleteProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProductsScreen);
