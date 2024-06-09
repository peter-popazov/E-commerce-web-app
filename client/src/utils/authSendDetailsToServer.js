import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
import { useAuth } from "../components/providers/AuthContext";

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
        const { setToken } = useAuth();
        setToken(response.data.access_token);
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
