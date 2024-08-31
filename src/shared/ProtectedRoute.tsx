import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useSelector((state: RootState) => state.auth.token);
  if (localStorage.getItem("token") || token !== null) return children;
  else return <Navigate to="/login" />;
}

export default ProtectedRoute;
