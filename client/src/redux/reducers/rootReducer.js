import { combineReducers } from "redux";
import authReducer from "./authReducer/auth.reducer";
import errorReducer from "./errorReducer/error.reducer";
import movieInfoReducer from "./movieInfoReducer/movieInfo.reducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  localMovie: movieInfoReducer
});
