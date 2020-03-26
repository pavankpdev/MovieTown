import { combineReducers } from "redux";
import authReducer from "./authReducer/auth.reducer";

export default combineReducers({
  auth: authReducer
});
