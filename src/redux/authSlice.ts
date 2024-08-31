import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface AuthState {
  token: string | null;
  decodedToken: null | DecodedToken;
}

const getDecodedToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  return null;
};

// Define the initial state
const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  decodedToken: getDecodedToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (state.token) {
        localStorage.setItem("token", state.token);
      }
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
