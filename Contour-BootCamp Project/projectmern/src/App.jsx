import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/";
import Signin from "./pages/SignIn/";
import Signup from "./pages/Signup/";
import Dashboard from "./pages/UserDashboard/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import User from "./pages/User/";
import ActivityForm from "./pages/Activity/";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/activity",
    element: <ActivityForm />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoutes />,
    children: [
      {
        index: true,
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/history",
        element: <History />,
      },
    ],
  },

  {
    path: "/user/:userId",
    element: <User />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
