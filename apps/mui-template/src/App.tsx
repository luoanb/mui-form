import Header from "./layout/header";
import Dashboard, { DashboardState } from "./layout/dashboard";
import Nav from "./layout/nav";
import { ComponentRef, useContext, useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Collapse, Container, Stack, useTheme } from "@mui/material";
import AccountButton from "./component/accountButton";
import LangSwitch from "./lang/langSwitch";
import useResponsive from "./layout/useResponsive";

const LeftContent = () => {
  const { miniNav } = useContext(DashboardState);

  const { setOpenNav, setMiniNav } = useContext(DashboardState);
  return (
    <>
      <Collapse
        orientation="horizontal"
        in={!(useResponsive("down", "md") || !miniNav)}
      >
        <Box
          sx={{
            width: 270,
          }}
        ></Box>
      </Collapse>
      {useResponsive("down", "md") ? (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={(theme) => ({
            mr: 2,
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
            md: { display: "block" },
          })}
          onClick={() => setOpenNav(true)}
        >
          <MenuIcon />
        </IconButton>
      ) : (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={(theme) => ({
            mr: 2,
            [theme.breakpoints.up("md")]: {
              display: "block",
            },
            md: { display: "none" },
          })}
          onClick={() => setMiniNav((old) => !old)}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Typography variant="h6" color="inherit" component="div">
        MUI-Template
      </Typography>
    </>
  );
};

const RightContent = () => {
  return (
    <Stack direction="row" spacing={2}>
      <LangSwitch />
      <AccountButton />
    </Stack>
  );
};

function App() {
  const dashref = useRef<ComponentRef<typeof Dashboard>>(null);
  const theme = useTheme();
  useEffect(() => {
    dashref.current?.log(
      "初始化完成,调用Dashboard的方法,useEffect怎么会调用了两次"
    );
  }, []);
  return (
    <Dashboard
      ref={dashref}
      nav={<Nav />}
      header={
        <Header leftContent={<LeftContent />} rightContent={<RightContent />} />
      }
    >
      <Container maxWidth="lg" sx={{ marginTop: theme.spacing(4) }}>
        <Typography variant="h2">标题</Typography>
      </Container>
    </Dashboard>
  );
}

export default App;
