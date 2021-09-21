import React, { useEffect, useReducer } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import ErrorText from "./ErrorText";

const UPDATE_TEXT = "UPDATE_TEXT";
const TOUCHED_INPUT = "TOUCHED_INPUT";

const inputReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TEXT:
      const { value, isValid } = action;
      return {
        ...state,
        value,
        isValid,
      };

    case TOUCHED_INPUT:
      return {
        ...state,
        touched: true,
      };
    default:
      break;
  }
};

const Input = ({
  value,
  title,
  id,
  header,
  required,
  onInputChange,
  initialValue,
  initialValidity,
  ...rest
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    touched: false,
  });

  useEffect(() => {
    if (inputState.touched)
      onInputChange(id, inputState.value, inputState.isValid);
  }, [inputState.value, inputState.isValid, onInputChange, id]);

  const onTextChangeHandler = (text) => {
    const isValid = true;
    if (required && !text.trim().length) isValid = false;

    dispatch({ type: UPDATE_TEXT, value: text, isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: TOUCHED_INPUT });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{header}</Text>
      <TextInput
        style={styles.input}
        value={inputState.value}
        onChangeText={onTextChangeHandler}
        onBlur={lostFocusHandler}
        {...rest}
      />
      {
        !(
          inputState.isValid && (
            <ErrorText>Please enter a valid {header.toLowerCase()}</ErrorText>
          )
        )
      }
    </View>
  );
};
const styles = StyleSheet.create({
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
export default Input;
