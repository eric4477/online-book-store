import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import navbarReducer from './navbarSlice';
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    navbar: navbarReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
