import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login/Login";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import MasterLayout from "./layouts/MasterLayout/MasterLayout";
import Home from "./pages/master/Home/Home";
import Register from "./pages/auth/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPass from "./pages/auth/ForgotPass/ForgotPass";
import ResetPass from "./pages/auth/ResetPass/ResetPass";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPass /> },
      { path: "reset-password", element: <ResetPass /> },
    ],
  },
  {
    path: "/home",
    element: <MasterLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
