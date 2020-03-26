import { TEST_DISPATCH } from "./auth.types";

export const registerUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
