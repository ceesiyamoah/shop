import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Text,
  Button,
  Alert,
  AsyncStorage,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../components/UI/Card";
import colors from "../../constants/colors";
import { connect } from "react-redux";
import { login, signup } from "../../store/action/authActions";

const AuthScreen = ({ login, signup, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onAuthHandler = () => {
    if (!email || !password) {
      Alert.alert("Wrong input", "Please enter the correct details", [
        { text: "Close", style: "destructive" },
      ]);
      return;
    }
    if (password.length < 6) {
      Alert.alert("Wrong input", "Minimum of 6 characters for password", [
        { text: "Close", style: "destructive" },
      ]);
      return;
    }
    setIsLoading(true);
    setError(null);
    if (isLogin) {
      login({ email, password })
        .then((res) => {
          setIsLoading(false);
          navigation.navigate("Shop");
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    } else {
      signup({ email, password })
        .then((res) => {
          setIsLoading(false);
          navigation.navigate("Shop");
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred", error, [
        { text: "Close", style: "destructive" },
      ]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior='height'
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#1E91D6", "#8D3B72"]} style={styles.gradient}>
        <Card style={styles.authCon}>
          <ScrollView>
            <View style={styles.form}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                secureTextEntry
                keyboardType='default'
                minLength
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <View style={styles.buttonsHolder}>
              {isLoading ? (
                <ActivityIndicator size={50} color={colors.primary} />
              ) : (
                <Button
                  title={isLogin ? "Login" : "Sign Up"}
                  onPress={onAuthHandler}
                  color={colors.primary}
                />
              )}
            </View>
            <View style={styles.buttonsHolder}>
              <Button
                title={`Switch to ${isLogin ? "Sign up" : "Login"}`}
                onPress={() => {
                  setIsLogin((curr) => !curr);
                }}
                color={colors.secondary}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authentication",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
    marginVertical: 8,
    padding: 10,
    paddingHorizontal: 10,
    // width: 400,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: "100%",
  },
  buttonsHolder: {
    marginTop: 20,
    width: "50%",
    marginHorizontal: "20%",
  },
  authCon: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    // height: "50%",
  },
  form: {
    width: 300,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  login,
  signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
