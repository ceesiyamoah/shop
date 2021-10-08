import { AUTHENTICATE, LOGOUT } from "../../types/types";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTHENTICATE:
      return { ...state, token: payload.token, userId: payload.userId };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
