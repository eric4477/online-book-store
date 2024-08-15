import { Outlet } from "react-router-dom";
import authImage from "../../assets/images/auth-layout-books.jpg";

function AuthLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div
        className="hidden md:block bg-cover bg-center relative"
        style={{ backgroundImage: `url(${authImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      <Outlet />
    </div>
  );
}
export default AuthLayout;
