import { AsyncStorage } from "react-native";
import { AUTHENTICATE, LOGOUT } from "../../types/types";

let timer;

export const login = (details) => async (dispatch) => {
  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvkRObrkvqyW7G1T_2u3ReNS6Uh2WkWOo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: details.email,
          password: details.password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      const errMessage = errData.error.message;

      if (errMessage === "EMAIL_NOT_FOUND") {
        message = "There is no user record corresponding to this identifier.";
      }
      if (errMessage === "INVALID_PASSWORD")
        message =
          "The password is invalid or the user does not have a password";
      if (errMessage === "USER_DISABLED")
        message = "The user account has been disabled by an administrator.";
      throw new Error(message);
    }

    const { idToken, localId, expiresIn } = await response.json();
    dispatch(authenticate(idToken, localId, expiresIn));
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    ).toISOString();
    saveData(idToken, localId, expirationDate);
  } catch (err) {
    throw new Error(err);
  }
};

const saveData = (token, id, expiryDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: id,
      expiryDate: expiryDate,
    })
  );
};

export const authenticate = (token, id, expiryTime) => (dispatch) => {
  dispatch(setLogoutTimer(+expiryTime * 1000));
  dispatch({
    type: AUTHENTICATE,
    payload: { token, userId: id },
  });
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return {
    type: LOGOUT,
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

export const setLogoutTimer = (expirationTime) => (dispatch) => {
  timer = setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
};

export const signup = (details) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvkRObrkvqyW7G1T_2u3ReNS6Uh2WkWOo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: details.email,
          password: details.password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      const errMessage = errData.error.message;

      if (errMessage === "EMAIL_EXISTS") {
        message = "The email address is already in use by another account.";
      }
      if (errMessage === "OPERATION_NOT_ALLOWED")
        message = "Password sign-in is disabled for this project.";
      if (errMessage === "TOO_MANY_ATTEMPTS_TRY_LATER")
        message =
          "We have blocked all requests from this device due to unusual activity. Try again later.";
      throw new Error(message);
    }

    const { idToken, localId, expiresIn } = await response.json();

    dispatch(authenticate(idToken, localId, expiresIn));
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    ).toISOString();
    saveData(idToken, localId, expirationDate);
  } catch (err) {
    throw new Error(err);
  }
};
