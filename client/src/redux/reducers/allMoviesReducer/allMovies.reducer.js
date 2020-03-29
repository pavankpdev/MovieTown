import { GET_ALL_MOVIES } from "./allMovies.types";

const INITIAL_STATE = {
  popularMovies: [],
  nowPlayingMovies: [],
  trendingMovies: [],
  upComingMovies: []
};

const getAllMovies = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_MOVIES:
      return {
        ...state,
        popularMovies: action.payload.popularMovies, //payload.popularMovies
        nowPlayingMovies: action.payload.nowPlayingMovies,
        trendingMovies: action.payload.trendingMovies,
        upComingMovies: action.payload.upComingMovies
      };

    default:
      return state;
  }
};

export default getAllMovies;
