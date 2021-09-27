import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import colors from "../../constants/colors";
import { getOrders } from "../../store/action/ordersActions";

const OrdersScreen = ({ orders, getOrders, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [refresh, setRefresh] = useState(false);

  const getData = useCallback(() => {
    setIsLoading(true);
    setError();
    setRefresh(true);

    getOrders()
      .then((res) => {
        setIsLoading(false);
        setRefresh(false);

        setError();
      })
      .catch((err) => {
        setIsLoading(false);
        setRefresh(false);

        setError(err.message);
      });
  }, [getOrders, setError, setIsLoading, setRefresh]);

  useEffect(() => {
    getData();
  }, [getData]);
  useEffect(() => {
    const hearer = navigation.addListener("willFocus", getOrders);
    getOrders();
    return () => {
      hearer.remove();
    };
  }, [getOrders]);

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

  if (!isLoading && !orders.length) {
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>No Orders yet</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      onRefresh={getData}
      refreshing={refresh}
      renderItem={({ item }) => (
        <OrderItem {...item} date={item.readableDate} />
      )}
    />
  );
};

OrdersScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Orders",
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#ccc",
  },
});

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
});

const mapDispatchToProps = {
  getOrders,
};
// OrdersScreen.navigationOptions=()=>{
//   return {

//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);
