import { GET_SEAT_INFO } from "./seats.type";
import { GET_ERROR } from "../errorReducer/error.types";
import { defaultAxiosHeader } from "../../../utils/axiosDefaults";

import axios from "axios";

export const getSeatsInfo = ({ name, time }) => async (dispatch) => {
  const { title } = JSON.parse(localStorage.selectedMovie);

  const token = localStorage.jwtToken;
  try {
    const { data } = await axios.get(
      `/movies/booktickets/select_seats/${title}/${name}/${time}`
    );
    defaultAxiosHeader(token);
    dispatch({ type: GET_SEAT_INFO, payload: data.show });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: `seat details error ${error}`,
    });
  }
};
