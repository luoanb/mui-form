import { Avatar, Box, CardHeader, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import Card from "@mui/material/Card";
import navData from "./navData";
import { useContext, useMemo } from "react";
import { DashboardState, GroupTitle } from "mui-layout";
import { MuiTree } from "mui-form-hook";
import { InsideItem } from "./insideItem";

const OutMenu = ({ navData }: { navData: any[] }) => {
  return (
    <>
      {navData.map((item) => (
        <>
          <GroupTitle title={item.title} />
          {item.children ? (
            <MuiTree data={item.children} keyExpr="path" displayExpr="title" />
          ) : null}
        </>
      ))}
    </>
  );
};

const InsideMenu = ({ navData }: { navData: any[] }) => {
  // const listData = Array.prototype.flat.call(navData, 1);
  const listData = useMemo(() => {
    return navData.reduce((pre: any[], cur, i) => pre.concat(cur.children), []);
  }, [navData]);
  return (
    <>
      {listData.map((item, index) => (
        <InsideItem
          item={item}
          keyExpr="path"
          key={index}
          displayExpr="title"
        />
      ))}
    </>
  );
};

export default function Nav() {
  const { miniNav, openNav } = useContext(DashboardState);
  const theme = useTheme();
  const show = miniNav || openNav;
  return (
    <Box sx={{ mr: "12px" }}>
      {show ? (
        <Card
          sx={{
            margin: "12px 12px 12px 24px",
            width: 232,
            background: theme.palette.grey[300],
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
      {!show ? <InsideMenu navData={navData} /> : <OutMenu navData={navData} />}
    </Box>
  );
}
