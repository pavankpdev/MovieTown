import { TEST_DISPATCH } from "./auth.types";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {}
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
