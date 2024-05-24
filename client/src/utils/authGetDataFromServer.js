import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

export const authGetDataFromServer = (url) => {
  const accessToken = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios
    .get(API_BASE_URL + url, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Error occured", error);
    });
};
