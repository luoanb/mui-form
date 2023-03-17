import Typography from "@mui/material/Typography";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import LoginPage from "./login";
import RegisterPage from "./register";
import { BlankLayout, RouterDashboard, RouterEmpty } from "./routerLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: BlankLayout,
    children: [
      {
        path: "login",
        Component: LoginPage
      },
      {
        path: "register",
        Component: RegisterPage
      }
    ]
  },
  {
    path: "/dashboard",
    Component: RouterDashboard,
    children: [
      {
        path: "index",
        element: <Typography variant="h2">标题</Typography>
      }
    ]
  }
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
