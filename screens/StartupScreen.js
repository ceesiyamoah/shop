import React from "react";
import { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { connect } from "react-redux";
import colors from "../constants/colors";
import { authenticate } from "../store/action/authActions";

const StartupScreen = ({ navigation, authenticate }) => {
  useEffect(() => {
    AsyncStorage.getItem("userData")
      .then((res) => {
        if (!res) {
          navigation.navigate("Auth");
          return;
        }
        const { token, userId, expiryDate } = JSON.parse(res);
        if (new Date(expiryDate) <= new Date() || !token || !userId) {
          navigation.navigate("Auth");
          return;
        }
        navigation.navigate("Auth");
        authenticate(token, userId);
      })
      .catch((err) => {
        navigation.navigate("Shop");
      });
  }, []);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={colors.primary} />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  authenticate,
};

export default connect()(StartupScreen);
