import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store"; // Adjust to your store file

// Typed useDispatch hook for dispatching async thunks
export const useAppDispatch: () => AppDispatch = useDispatch;
