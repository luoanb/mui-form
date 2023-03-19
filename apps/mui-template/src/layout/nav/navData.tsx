// component

import SvgIcon from "../../component/svgIcon";
import LensIcon from "@mui/icons-material/Lens";

const icon = (name: string) => (
  <SvgIcon name={name} sx={{ width: 1, height: 1 }} />
);

const navData = [
  {
    id: "0",
    title: "基础工具",
    children: [
      {
        id: "1",
        title: "dashboard",
        path: "/dashboard/index",
        icon: icon("ic_analytics"),
      },
      {
        id: "2",
        title: "register",
        path: "/auth/register",
        icon: icon("ic_lock"),
      },
      {
        id: "3",
        title: "login",
        path: "/auth/login",
        icon: icon("ic_lock"),
      },
      {
        id: "4",
        icon: icon("ic_disabled"),
        title: "异常页面",
        children: [
          {
            id: "5",
            title: "Not found",
            icon: (
              <LensIcon
                sx={(t) => ({
                  width: "12px",
                  height: "12px",
                  color: t.palette.text.disabled,
                })}
              />
            ),
            path: "/auth/404",
          },
          {
            id: "6",
            title: "没有权限",
            icon: (
              <LensIcon
                sx={(t) => ({
                  width: "12px",
                  height: "12px",
                  color: t.palette.text.disabled,
                })}
              />
            ),
            path: "/auth/401",
          },
          {
            id: "7",
            title: "服务器异常",
            icon: (
              <LensIcon
                sx={(t) => ({
                  width: "12px",
                  height: "12px",
                  color: t.palette.text.disabled,
                })}
              />
            ),
            path: "/auth/500",
          },
        ],
      },
    ],
  },
];

export default navData;
