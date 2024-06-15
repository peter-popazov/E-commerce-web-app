import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

export const authRequest = async (
  url,
  payload,
  onSuccess,
  setErrors,
  token,
  refreshToken,
  setToken
) => {
  try {
    // Initial request
    const response = await axios.post(API_BASE_URL + url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    onSuccess();
    return response.data;
  } catch (error) {
    // If the initial request fails
    if (error.response && error.response.status === 403) {
      try {
        // Refresh the token
        const refreshResponse = await axios.post(
          API_BASE_URL + "/refresh-token",
          null,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const refreshedToken = refreshResponse.data.access_token;
        setToken(refreshedToken);

        // Retry the original request with the refreshed token
        const retryResponse = await axios.post(API_BASE_URL + url, payload, {
          headers: {
            Authorization: `Bearer ${refreshedToken}`,
            "Content-Type": "application/json",
          },
        });

        onSuccess();
        return retryResponse.data;
      } catch (refreshError) {
        setErrors(["Failed to refresh token"]);
      }
    } else {
      // Handle other errors
      if (error.response) {
        setErrors(error.response.data.errors || ["An unknown error occurred"]);
      } else {
        setErrors(["An error occurred while communicating with the server"]);
      }
    }
  }
};
