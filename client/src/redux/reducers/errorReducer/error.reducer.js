import { GET_ERROR } from "./error.types";

const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
