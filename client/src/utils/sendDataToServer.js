import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

export const sendDetailsToServer = async (
  payload,
  redirectToHome,
  setErrors,
  url,
  token
) => {
  try {
    const response = await axios.post(API_BASE_URL + url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      redirectToHome();
      return response.data;
    } else {
      console.log("Some error occurred");
      throw new Error("Some error occurred");
    }
  } catch (error) {
    if (error.response) {
      setErrors(error.response.data.errorMessage || "An error occurred");
    } else if (error.request) {
      setErrors("No response received from the server");
    } else {
      setErrors(error.message);
    }
    throw error;
  }
};

export default sendDetailsToServer;
