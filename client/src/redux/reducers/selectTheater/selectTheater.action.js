import axios from "axios";
import { GET_THEATER } from "./selectTheater.type";
import { GET_ERROR } from "../errorReducer/error.types";

export const getTheaters = (zipCode) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/movies/theaters/${zipCode}`);
    dispatch({
      type: GET_THEATER,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: `get theaters ${e}`,
    });
  }
};
