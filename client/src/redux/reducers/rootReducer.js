import { combineReducers } from "redux";
import authReducer from "./authReducer/auth.reducer";
import errorReducer from "./errorReducer/error.reducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
