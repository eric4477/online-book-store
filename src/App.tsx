import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login/Login";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import MasterLayout from "./layouts/MasterLayout/MasterLayout";
import Home from "./pages/master/Home/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
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
  return <RouterProvider router={routes} />;
}

export default App;
