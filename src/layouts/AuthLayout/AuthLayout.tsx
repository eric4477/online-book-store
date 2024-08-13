import { Outlet } from "react-router-dom";
import authImage from "../../assets/images/auth-layout-books.jpg";

function AuthLayout() {
  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/2">
        <img
          className="w-full h-full object-cover"
          src={authImage}
          alt="auth-image"
        />
      </div>
      <Outlet />
    </div>
  );
}
export default AuthLayout;
