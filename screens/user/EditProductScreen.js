import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  ToastAndroid,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import {
  createProduct,
  updateProduct,
} from "../../store/action/productActions";

const EditProductScreen = ({
  navigation,
  product,
  createProduct,
  updateProduct,
}) => {
  const [title, setTitle] = useState(product?.title || "");
  const [imageUrl, setImageURL] = useState(product?.imageUrl || "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(product?.description || "");

  const submitHandler = useCallback(() => {
    if (product) {
      console.log({ id: product.id, title, description, imageUrl });
      updateProduct({ id: product.id, title, description, imageUrl });
    } else {
      createProduct({ title, description, imageUrl, price });
    }
    navigation.navigate("UserProducts");
    ToastAndroid.show(
      `Item ${product ? "Edited" : "Created"}`,
      ToastAndroid.SHORT
    );
  }, [title, description, imageUrl, price]);

  useEffect(() => {
    navigation.setParams({
      submit: submitHandler,
    });
  }, [submitHandler]);
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageURL(text)}
          />
        </View>
        {!product && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              keyboardType='number-pad'
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
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
