import { Avatar, CardHeader, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import Card from "@mui/material/Card";
import navData from "./navData";
import { useContext } from "react";
import { DashboardState, GroupTitle } from "mui-layout";
import { MuiTree } from "mui-form-hook";

export default function Nav() {
  const { miniNav, openNav } = useContext(DashboardState);
  const theme = useTheme();
  const show = miniNav || openNav;
  return (
    <>
      {show ? (
        <Card
          sx={{
            margin: "12px 24px",
            width: 232,
            background: theme.palette.grey[300]
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                张
              </Avatar>
            }
            title="张三"
          />
        </Card>
      ) : null}
      {show ? <GroupTitle title="基本的" /> : null}
      <MuiTree data={navData} keyExpr="path" displayExpr="title" />
      {show ? <GroupTitle title="商务" /> : null}
      <MuiTree data={navData} keyExpr="path" displayExpr="title" />
    </>
  );
}
