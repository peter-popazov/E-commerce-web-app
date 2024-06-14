import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

export const authRequest = async (
  url,
  payload,
  onSuccess,
  setErrors,
  token
) => {
  try {
    if (!token) {
      throw new Error("Token not found in local storage");
    }

    const response = await axios.post(API_BASE_URL + url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    onSuccess();
    return response.data;
  } catch (error) {
    if (error.response) {
      setErrors(error.response.data.errors || ["An unknown error occurred"]);
    } else {
      setErrors(["An error occurred while communicating with the server"]);
    }
    console.error("Error:", error);
  }
};
