import React, { useCallback, useEffect, useState, useReducer } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";
import ErrorText from "../../components/UI/ErrorText";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";
import colors from "../../constants/colors";
import {
  createProduct,
  updateProduct,
} from "../../store/action/productActions";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const { input, isValid, value } = action;
      const newState = {
        ...state,
        inputValues: { ...state.inputValues, [input]: value },
        inputValidities: { ...state.inputValidities, [input]: isValid },
      };
      newState.formValid = Object.values(newState.inputValidities).every(
        (item) => item
      );
      return newState;

    default:
      return state;
      break;
  }
};

const EditProductScreen = ({
  navigation,
  product,
  createProduct,
  updateProduct,
}) => {
  const initialState = {
    inputValues: {
      title: product?.title || "",
      imageUrl: product?.imageUrl || "",
      price: "",
      description: product?.description || "",
    },
    inputValidities: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      description: product ? true : false,
      price: product ? true : false,
    },
    formValid: product ? true : false,
  };

  const [title, setTitle] = useState(product?.title || "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState("");
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  const submitHandler = useCallback(() => {
    if (!title || !description || !imageUrl || (!!!product && !price)) {
      Alert.alert("Wrong input!", "Please check the errors in the form", [
        { style: "destructive", text: "Okay" },
      ]);
      return;
    }
    setIsError(null);
    setIsLoading(true);
    if (product) {
      updateProduct({
        id: product.id,
        title,
        description,
        imageUrl,
      })
        .then((res) => {
          setIsLoading(false);
          navigation.goBack();
        })
        .catch((err) => {
          setIsError(err.message);
          setIsLoading(false);
        });
    } else {
      createProduct({
        title,
        description,
        imageUrl,
        price: +price,
      })
        .then((res) => {
          setIsLoading(false);
          navigation.goBack();
        })
        .catch((err) => {
          setIsError(err.message);
          setIsLoading(false);
        });
    }
    ToastAndroid.show(
      `Item ${product ? "Edited" : "Created"}`,
      ToastAndroid.SHORT
    );
  }, [createProduct, updateProduct, title, description, imageUrl, price]);

  useEffect(() => {
    navigation.setParams({
      submit: submitHandler,
    });
  }, [submitHandler]);

  useEffect(() => {
    if (isError) {
      Alert.alert("Error", "An error occurred", [
        { text: "Okay", style: "destructive" },
      ]);
    }
  }, [isError]);

  const textChangedHandler = useCallback((inputIdentifier, value, isValid) => {
    dispatch({
      type: FORM_INPUT_UPDATE,
      input: inputIdentifier,
      value,
      isValid,
    });
  });

  if (isLoading)
    return (
      <View style={styles.screen}>
        <ActivityIndicator size='large' color={colors.primary} />
      </View>
    );

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <Text style={styles.label}>ImageUrl</Text>

          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />

          {!product && (
            <View>
              <Text style={styles.label}>Price</Text>

              <TextInput
                style={styles.input}
                value={price}
                keyboardType='numeric'
                onChangeText={(text) => setPrice(text)}
              />
            </View>
          )}

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const submitFn = navigation.getParam("submit");
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <View>
          <Item title='Save' iconName='checkmark-circle' onPress={submitFn} />
        </View>
      </HeaderButtons>
    ),
    headerTitle: navigation.getParam("id") ? "Edit Product" : "Add Product",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state, { navigation }) => ({
  product: state.products.userProducts.find(
    (item) => item.id === navigation.getParam("id")
  ),
});

const mapDispatchToProps = {
  createProduct,
  updateProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductScreen);
