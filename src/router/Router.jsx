// src/routes.js
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/Layouts";
import Team from "../pages/Content/Team";
import Complexity from "../pages/Content/Complexity";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "team", element: <Team /> },
      { path: "complexity", element: <Complexity /> },
    ],
  },
]);

export default router;
