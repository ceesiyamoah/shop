import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import colors from "../../constants/colors";
import { deleteAllItems, deleteItem } from "../../store/action/cartActions";
import { addOrder } from "../../store/action/ordersActions";

const CartScreen = ({
  total,
  items,
  deleteAllItems,
  navigation,
  deleteItem,
  addOrder,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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

  const sendOrderHandler = () => {
    setIsLoading(true);
    addOrder(items, total)
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${total}</Text>
        </Text>
        {!isLoading ? (
          <Button
            title='Order Now'
            color={colors.secondary}
            disabled={!items.length}
            onPress={sendOrderHandler}
          />
        ) : (
          <ActivityIndicator size='small' color={colors.primary} />
        )}
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <CartItem
            {...item}
            onRemove={() => {
              deleteItem(item.productId);
            }}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

CartScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Cart",
    headerRight: () =>
      navigation.getParam("display") && (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Delete'
            iconName='trash'
            onPress={() => {
              // navigation.getParam("deleteAllItems")();
              Alert.alert(
                "Delete All ",
                "Are you sure you want to delete all items?",
                [
                  {
                    text: "Yes",
                    onPress: () => {
                      navigation.getParam("deleteAllItems")();
                    },
                  },
                  {
                    text: "Cancel",
                  },
                ],
                {
                  cancelable: true,
                }
              );
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

  trans.sort((a, b) => b.price - a.price);

  return {
    total: Math.abs(state.cart.totalAmount).toFixed(2),
    items: trans,
  };
};

const mapDispatchToProps = {
  deleteAllItems,
  deleteItem,
  addOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
