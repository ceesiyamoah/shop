import React, { useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { FlatList } from "react-native-web";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import colors from "../../constants/colors";
import { deleteAllItems } from "../../store/action/cartActions";

const CartScreen = ({ total, items, deleteAllItems, navigation }) => {
  useEffect(() => {
    navigation.setParams({
      deleteAllItems,
    });
  }, [deleteAllItems]);
  useEffect(() => {
    navigation.setParams({
      display: items.length > 0,
    });
  }, [items]);
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${total}</Text>
        </Text>
        {
          <Button
            title='Order Now'
            color={colors.secondary}
            disabled={!items.length}
          />
        }
      </View>
      {/* <FlatList /> */}
      <View>
        <Text>For flat</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});

CartScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () =>
      navigation.getParam("display") && (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Delete'
            iconName='trash'
            onPress={() => {
              navigation.getParam("deleteAllItems")();
            }}
          />
        </HeaderButtons>
      ),
  };
};

const mapStateToProps = (state) => {
  const trans = [];
  for (const key in state.cart.items) {
    trans.push({
      productId: key,
      price: state.cart.items[key].price,
      title: state.cart.items[key].title,
      quantity: state.cart.items[key].quantity,
      sum: state.cart.items[key].sum,
    });
  }

  return {
    total: state.cart.totalAmount.toFixed(2),
    items: trans,
  };
};

const mapDispatchToProps = {
  deleteAllItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
