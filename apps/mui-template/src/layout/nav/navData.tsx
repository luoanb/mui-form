// component

import SvgIcon from "../../component/svgIcon";
import LensIcon from "@mui/icons-material/Lens";
import DatabaseArrowRightOutline from "mdi-material-ui/DatabaseArrowRightOutline";
import BarChart from "@mui/icons-material/BarChart";
import Login from "@mui/icons-material/Login";
import HowToReg from "@mui/icons-material/HowToReg";
import ErrorIcon from "@mui/icons-material/Error";
import { SxProps, Theme } from "@mui/material/styles";

const ChildIcon = () => (
  <LensIcon
    sx={(t) => ({
      width: "12px",
      height: "12px",
      color: t.palette.text.disabled,
    })}
  />
);

const icon = (name: string) => (
  <SvgIcon
    name={name}
    sx={(t) => ({
      color: t.palette.text.disabled,
      "& use": {
        fill: t.palette.text.disabled,
      },
    })}
  />
);

const sx: SxProps<Theme> = (t) => ({
  color: t.palette.text.secondary,
  width: 24,
  height: 24,
});
const navData = [
  {
    id: "0",
    title: "基础工具",
    children: [
      {
        id: "1",
        title: "dashboard",
        path: "/dashboard/index",
        icon: <BarChart sx={sx} />,
      },
      {
        id: "1-1",
        title: "DataExport",
        path: "/dashboard/DataExport",
        icon: <DatabaseArrowRightOutline sx={sx} />,
      },
      {
        id: "2",
        title: "register",
        path: "/auth/register",
        icon: <HowToReg sx={sx} />,
      },
      {
        id: "3",
        title: "login",
        path: "/auth/login",
        icon: <Login sx={sx} />,
      },
      {
        id: "4",
        icon: <ErrorIcon sx={sx} />,
        title: "异常页面",
        children: [
          {
            id: "5",
            title: "Not found",
            icon: <ChildIcon />,
            path: "/auth/404",
          },
          {
            id: "6",
            title: "没有权限",
            icon: <ChildIcon />,
            path: "/auth/401",
          },
          {
            id: "7",
            title: "服务器异常",
            icon: <ChildIcon />,
            path: "/auth/500",
          },
          {
            id: "8",
            title: "服务器异常2",
            icon: <ChildIcon />,
            path: "/dashboard/500",
          },
        ],
      },
    ],
  },
];

export default navData;
