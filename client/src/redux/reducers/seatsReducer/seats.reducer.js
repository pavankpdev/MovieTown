import { GET_SEAT_INFO } from "./seats.type";

const INITIAL_STATE = [];

const getSeatInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SEAT_INFO:
      return {
        ...state,
        seatsInfo: action.payload,
      };

    default:
      return state;
  }
};

export default getSeatInfoReducer;
