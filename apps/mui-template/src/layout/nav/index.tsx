import { Avatar, Box, CardHeader, Typography, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import Card from "@mui/material/Card";
import getNavData from "./navData";
import { SetStateAction, useContext, useEffect, useMemo } from "react";
import { DashboardState, GroupTitle } from "mui-layout-component";
import { MuiTree } from "mui-form-hook";
import { InsideItem } from "./insideItem";
import { Link } from "../../component/nextLink";
import { useMatches } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const customLabelText = ({
  itemData,
  displayExpr = "name",
  iconExpr = "icon",
}: any) => {
  return (
    <Box
      to={itemData.path}
      component={Link}
      sx={(t) => ({
        display: "flex",
        alignItems: "center",
        padding: 0.5,
        paddingRight: 0,
        color: t.palette.text.primary,
        textDecoration: "none",
      })}
    >
      <Box color="inherit" sx={{ width: 40, hight: 40 }}>
        {itemData[iconExpr]}
      </Box>
      <Typography variant="body2" sx={{ fontWeight: "inherit", flexGrow: 1 }}>
        {itemData[displayExpr]}
      </Typography>
    </Box>
  );
};

const OutMenu = ({ navData }: { navData: any[] }) => {
  const { selectid } = useContext(DashboardState);
  const treeViewProps = useMemo(
    () => ({
      sx: { ml: "12px" },
      selected: [selectid],
    }),
    [selectid]
  );
  return (
    <>
      {navData.map((item) => (
        <Box key={item.id}>
          <GroupTitle title={item.title} />
          {item.children ? (
            <MuiTree
              treeViewProps={treeViewProps}
              data={item.children}
              keyExpr="id"
              displayExpr="title"
              customLabelText={customLabelText}
            />
          ) : null}
        </Box>
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
        <InsideItem item={item} keyExpr="id" key={index} displayExpr="title" />
      ))}
    </>
  );
};

const flatData = (treeData: any[]) => {
  return treeData.reduce((pre: any[], cur) => {
    pre.push(cur);
    if (cur.children) {
      pre.push(...flatData(cur.children));
    }
    return pre;
  }, [] as any[]);
};

export default function Nav() {
  const { miniNav, openNav, setSelectid, selectid } =
    useContext(DashboardState);
  const theme = useTheme();
  const show = miniNav || openNav;
  const routerState = useMatches();
  useEffect(() => {
    const pathname = routerState[routerState.length - 1]?.pathname;
    const id = flatVavData.find((item) => item.path === pathname)?.id;
    // debugger
    if (id) {
      setSelectid(id);
    }
  }, [routerState]);
  const { t } = useTranslation();
  const navData = useMemo(() => getNavData(t), [t]);
  const flatVavData = flatData(navData);
  return (
    <Box sx={{ mr: "12px" }}>
      {show ? (
        <Card
          sx={{
            margin: "12px 12px 12px 24px",
            width: 232,
            background: theme.palette.background.paper,
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {selectid}
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
