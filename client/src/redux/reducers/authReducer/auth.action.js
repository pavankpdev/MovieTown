import axios from "axios";
import jwt_decode from "jwt-decode";

import { defaultAxiosHeader } from "../../../utils/axiosDefaults";
import { GET_ERROR } from "../errorReducer/error.types";
import { SET_CURRENT_USER } from "./auth.types";

export const registerUser = (userData, history) => async dispatch => {
  //   sending data to server with axios
  try {
    const registerUser = await axios.post(
      `http://localhost:4000/${
        process.env.PORT ? process.env.PORT : 4000
      }/register`,
      userData
    );
    // redirecting user to home page if successfully registered
    return history.push("/");
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: `registerUSer ${error.response.data.error}`
    });
  }
};

export const setUser = userData => ({
  type: SET_CURRENT_USER,
  payload: userData
});

export const loginUser = userData => async dispatch => {
  //   sending data to server with axios
  try {
    const loginUser = await axios.post(
      `http://localhost:${
        process.env.PORT ? process.env.PORT : 4000
      }/users/login`,
      userData
    );
    // save the jwt token in localStorage
    const { token } = loginUser.data;
    localStorage.setItem("jwtToken", token);
    // set token to auth header
    defaultAxiosHeader(token);
    // decode token to get user data
    const decodedUser = jwt_decode(token);
    dispatch(setUser(decodedUser));
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: `login user ${error.response.data.error}`
    });
  }
};

export const logoutUser = () => dispatch => {
  // Remove the token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove token from axios header
  defaultAxiosHeader();
  // Remove the details from store by passing empty SET_CURRENT_USER and empty payload
  dispatch(setUser());
  // redirect the user back to signin page
  window.location.href = "/auth/signin";
};
