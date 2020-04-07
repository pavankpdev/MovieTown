import { combineReducers } from "redux";
import authReducer from "./authReducer/auth.reducer";
import errorReducer from "./errorReducer/error.reducer";
import movieInfoReducer from "./movieInfoReducer/movieInfo.reducer";
import allMoviesReducer from "./allMoviesReducer/allMovies.reducer";
import searchMovieReducer from "./searchMoviesReducer/searchMovies.reducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  allMovies: allMoviesReducer,
  localMovie: movieInfoReducer,
  searchedMovies: searchMovieReducer,
});
