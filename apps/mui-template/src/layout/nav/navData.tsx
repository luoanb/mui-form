// component

import SvgIcon from "../../component/svgIcon";

const icon = (name: string) => (
  <SvgIcon name={name} sx={{ width: 1, height: 1 }} />
);

const navData = [
  {
    title: "基础工具",
    children: [
      {
        title: "dashboard",
        path: "/dashboard/index",
        icon: icon("ic_analytics"),
      },
      {
        title: "register",
        path: "/auth/register",
        icon: icon("ic_lock"),
      },
      {
        title: "login",
        path: "/auth/login",
        icon: icon("ic_lock"),
      },
      {
        icon: icon("ic_disabled"),
        title: "异常页面",
        path: "error",
        children: [
          {
            title: "Not found",
            path: "/auth/404",
            icon: icon("ic_disabled"),
          },
          {
            title: "没有权限",
            path: "/auth/401",
            icon: icon("ic_disabled"),
          },
          {
            title: "服务器异常",
            path: "/auth/500",
            icon: icon("ic_disabled"),
          },
        ],
      },
    ],
  },
];

export default navData;
