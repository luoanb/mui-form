import Typography from "@mui/material/Typography";
import React, { lazy, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { BlankLayout, RouterDashboard, RouterEmpty } from "./routerLayout";

const asyncComponent = (url: string) => React.lazy(() => import(url));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard/index" replace />
  },
  {
    path: "/auth",
    Component: BlankLayout,
    children: [
      {
        path: "login",
        Component: asyncComponent("./login")
      },
      {
        path: "register",
        Component: asyncComponent("./register")
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
