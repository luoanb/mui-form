import React, { Suspense } from "react";
import { RouterProvider, Navigate, createHashRouter } from "react-router-dom";
import { BlankLayout, RouterDashboard, RouterEmpty } from "./routerLayout";

const Login = React.lazy(() => import("./login"));
const Register = React.lazy(() => import("./register"));
const Error404 = React.lazy(() => import("./404"));
const Error401 = React.lazy(() => import("./401"));
const Error500 = React.lazy(() => import("./500"));
const Dashboard = React.lazy(() => import("./index"));

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
        Component: Dashboard,
        // element: <Typography variant="h2">标题</Typography>,
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
