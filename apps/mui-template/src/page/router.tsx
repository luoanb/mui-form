import React, { Suspense } from "react";
import { RouterProvider, Navigate, createHashRouter } from "react-router-dom";
import { BlankLayout, RouterDashboard, RouterEmpty } from "./routerLayout";
import Box from "@mui/material/Box";

const Login = React.lazy(() => import("./login"));
const Register = React.lazy(() => import("./register"));
const Error404 = React.lazy(() => import("./404"));
const Error401 = React.lazy(() => import("./401"));
const Error500 = React.lazy(() => import("./500"));
const Dashboard = React.lazy(() => import("./index"));
const DataExport = React.lazy(() => import("./dataExport"));

export const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard/index" replace />,
  },

  {
    path: "/auth",
    Component: BlankLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "404",
        Component: Error404,
      },
      {
        path: "401",
        Component: Error401,
      },
      {
        path: "500",
        Component: Error500,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: RouterDashboard,
    children: [
      {
        path: "index",
        element: (
          <Suspense fallback={<Box>页面加载中</Box>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "DataExport",
        element: (
          <Suspense fallback={<Box>页面加载中</Box>}>
            <DataExport />
          </Suspense>
        ),
      },
      {
        path: "500",
        element: (
          <Suspense fallback={<Box>页面加载中</Box>}>
            <Error500 />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/auth/404" replace />,
  },
]);

export const Router = () => {
  return (
    <Suspense fallback={<div>加载中</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
