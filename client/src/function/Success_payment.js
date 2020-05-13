import axios from "axios";
import { defaultAxiosHeader } from "../utils/axiosDefaults";
export const Success_payment = async (data) => {
  console.log(data);
  const token = localStorage.jwtToken;
  try {
    defaultAxiosHeader(token);
    const checkout = await axios.all([
      axios.post("/movies/checkout", data),
      axios.post("/users/mytickets", data),
    ]);
    console.log(checkout[0].data);
    console.log(checkout[1].data);
  } catch (error) {
    console.log(error);
  }
};
