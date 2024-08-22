import axios from "axios";
import { LoginData } from "../interfaces/LoginData";

const API_URL = "https://upskilling-egypt.com:3007/api/auth/login";

export const login = async (data: LoginData) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      throw new Error(error.response?.data?.message || "Login failed");
    } else if (error instanceof Error) {
      // Handle other types of errors
      throw new Error(error.message);
    } else {
      // Handle unknown errors
      throw new Error("An unexpected error occurred");
    }
  }
};
