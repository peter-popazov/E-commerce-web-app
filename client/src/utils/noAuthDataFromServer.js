import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

const noAuthDataFromServer = async (url) => {
  try {
    const response = await axios.get(API_BASE_URL + url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};

export default noAuthDataFromServer;
