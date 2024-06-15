import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

export const authenticateUser = async (
  payload,
  redirectToHome,
  setErrors,
  url,
  setToken,
  setRefreshToken
) => {
  try {
    const response = await axios.post(API_BASE_URL + url, payload);
    if (response.status === 200 && response.data.access_token) {
      setToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      redirectToHome();
    } else {
      setErrors("No response received from the server");
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
