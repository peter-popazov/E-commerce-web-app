import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../constants/constants";

export const authSendDetailsToServer = (
  payload,
  redirectToHome,
  setErrors,
  url
) => {
  axios
    .post(API_BASE_URL + url, payload)
    .then((response) => {
      if (response.status === 200 && response.data.access_token) {
        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.access_token);
        redirectToHome();
      } else {
        console.log("Some error occurred");
      }
    })
    .catch((error) => {
      if (error.response) {
        setErrors(error.response.data.errorMessage || "An error occurred");
      } else if (error.request) {
        setErrors("No response received from the server");
      } else {
        setErrors(error.message);
      }
    });
};
