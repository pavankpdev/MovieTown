import axios from "axios";

export const defaultAxiosHeader = token => {
  if (token) {
    // apply this header to every request is signed in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // if not signed in delete this header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default defaultAxiosHeader;
