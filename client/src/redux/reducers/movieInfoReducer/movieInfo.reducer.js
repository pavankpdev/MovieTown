import { GET_MOVIE_INFO } from "./movieInfo.types";

const INITIAL_STATE = {
  selectedMovie: {}
};

const movieInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MOVIE_INFO:
      return {
        ...state,
        selectedMovie: action.payload
      };
    default:
      return state;
  }
};

export default movieInfoReducer;
