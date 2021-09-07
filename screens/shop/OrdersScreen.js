import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
const OrdersScreen = ({ orders }) => {
  return (
    <FlatList
      data={orders}
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
  screen: {},
});

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
});

const mapDispatchToProps = {};
// OrdersScreen.navigationOptions=()=>{
//   return {

//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);
