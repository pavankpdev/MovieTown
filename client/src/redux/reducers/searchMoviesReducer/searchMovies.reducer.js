import { SEARCH_MOVIES } from "./searchMovies.types";

const INITIAL_STATE = {
  searchedMovies: [],
};

const searchMovieReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SEARCH_MOVIES:
      localStorage.setItem("searchedMovies", JSON.stringify(action.payload));
      return {
        ...state,
        searchedMovies: action.payload,
      };

    default:
      return state;
  }
};

export default searchMovieReducer;
