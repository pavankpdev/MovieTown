import { SEARCH_MOVIES } from "./searchMovies.types";
import { GET_ERROR } from "../errorReducer/error.types";
import axios from "axios";

export const searchMovies = (inputString) => async (dispatch) => {
  try {
    const { data } = await axios.post("/movies/search", inputString);
    dispatch({
      type: SEARCH_MOVIES,
      payload: data,
    });
    window.location.href = "/search";
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: `searchMovies error ${error}`,
    });
  }
};
