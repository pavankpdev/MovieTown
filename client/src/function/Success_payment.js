import axios from "axios";
import { defaultAxiosHeader } from "../utils/axiosDefaults";
export const Success_payment = async (data) => {
  // fetchig token to access prvate routes
  const token = localStorage.jwtToken;
  try {
    // adding auth header to axios
    defaultAxiosHeader(token);
    // POST request to update DB
    const checkout = await axios.all([
      axios.post("/movies/checkout", data),
      axios.post("/users/mytickets", data),
    ]);
    // remove custom route from localStorage
    localStorage.removeItem("customRoute");
    // redirecting user to home page
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};
