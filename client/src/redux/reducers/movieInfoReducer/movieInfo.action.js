import axios from "axios";
import { GET_ERROR } from "../errorReducer/error.types";
import { GET_MOVIE_INFO } from "./movieInfo.types";

export const getMovieInfo = movieID => async dispatch => {
  const TMDB_FETCH_MOVIES_BASE_URI = "https://api.themoviedb.org/3/movie/";
  const TMDB_API_KEY = "a248d933920cd6d6527467220f28a930";
  try {
    const { data } = await axios.get(
      `${TMDB_FETCH_MOVIES_BASE_URI}${movieID}?api_key=${TMDB_API_KEY}`
    );
    dispatch({
      type: GET_MOVIE_INFO,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: "movieINfo " + " " + error
    });
  }
};
