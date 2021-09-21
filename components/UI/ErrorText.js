import React from "react";
import { View, StyleSheet, Text } from "react-native";
const ErrorText = ({ children }) => <Text style={styles.text}>{children}</Text>;
const styles = StyleSheet.create({
  text: { color: "red" },
});
export default ErrorText;
