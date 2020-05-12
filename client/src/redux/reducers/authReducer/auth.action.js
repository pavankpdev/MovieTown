import axios from "axios";
import jwt_decode from "jwt-decode";

import { defaultAxiosHeader } from "../../../utils/axiosDefaults";
import { GET_ERROR } from "../errorReducer/error.types";
import { SET_CURRENT_USER } from "./auth.types";

export const setUser = (userData) => ({
  type: SET_CURRENT_USER,
  payload: userData,
});

export const registerUser = (userData, history) => async (dispatch) => {
  //   sending data to server with axios
  try {
    const registerUser = await axios.post("/users/register", userData);
    // save the jwt token in localStorage
    const { token } = registerUser.data;
    localStorage.setItem("jwtToken", token);
    // set token to auth header
    defaultAxiosHeader(token);
    if (localStorage.customRoute) {
      return (window.location.href = "/movies/seats");
    }
    // decode token to get user data
    const decodedUser = jwt_decode(token);
    dispatch(setUser(decodedUser));
    return history.push("/");
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: error.response.data.error,
    });
  }
};

export const loginUser = (userData) => async (dispatch) => {
  //   sending data to server with axios
  try {
    const loginUser = await axios.post("/users/login", userData);
    // save the jwt token in localStorage
    const { token } = loginUser.data;
    localStorage.setItem("jwtToken", token);
    // set token to auth header
    defaultAxiosHeader(token);
    // decode token to get user data
    const decodedUser = jwt_decode(token);
    if (localStorage.customRoute) {
      return (window.location.href = "/movies/seats");
    }
    dispatch(setUser(decodedUser));
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: error.response.data.error,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  // Remove the token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove token from axios header
  defaultAxiosHeader();
  // Remove the details from store by passing empty SET_CURRENT_USER and empty payload
  dispatch(setUser());
  // redirect the user back to signin page
  window.location.href = "/auth/signin";
};
