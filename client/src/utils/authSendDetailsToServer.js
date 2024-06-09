import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

export const authSendDetailsToServer = async (
  payload,
  redirectToHome,
  setErrors,
  url,
  setToken
) => {
  try {
    const response = await axios.post(API_BASE_URL + url, payload);
    if (response.status === 200 && response.data.access_token) {
      await setToken(response.data.access_token);
      redirectToHome();
    } else {
      console.log("Some error occurred");
      setErrors("Some error occurred");
    }
  } catch (error) {
    if (error.response) {
      setErrors(error.response.data.errorMessage || "An error occurred");
    } else if (error.request) {
      setErrors("No response received from the server");
    } else {
      setErrors(error.message);
    }
  }
};
