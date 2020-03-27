import { SET_CURRENT_USER } from "./auth.types";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {}
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload ? true : false,
        user: action.payload ? action.payload : {}
      };
    default:
      return state;
  }
};

export default userReducer;
