import { GET_THEATER } from "./selectTheater.type";
const INITIAL_STATE = {
  theaters: [],
};

const getTheatersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_THEATER:
      return {
        ...state,
        theaters: action.payload,
      };
    default:
      return state;
  }
};

export default getTheatersReducer;
