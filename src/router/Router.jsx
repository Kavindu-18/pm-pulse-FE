// src/routes.js
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/Layouts";
import Team from "../pages/Content/Team";
import Complexity from "../pages/Content/Complexity";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddEmployee from "../pages/Content/AddEmployee";
import ViewEmployee from "../pages/Content/ViewEmployee";
import ViewKPI from "../pages/Content/ViewKPI";
import SkillInfo from "../pages/Content/SkillInfo";
import RiskType from "../pages/Content/RiskType";
import Home from "../pages/Content/Home";
import Crud from "../pages/Content/Crud";

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
      { path: "home", element: <Home /> },
      { path: "add-employee", element: <AddEmployee /> },
      { path: "view-employee", element: <ViewEmployee /> },
      { path: "view-KPI", element: <ViewKPI /> },
      { path: "skill", element: <SkillInfo /> },
      { path: "team", element: <Team /> },
      { path: "complexity", element: <Complexity /> },
      { path: "risk-type", element: <RiskType /> },
      { path: "crud", element: <Crud /> },
    ],
  },
]);

export default router;
