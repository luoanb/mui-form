import Header from "./layout/header";
import Dashboard from "./layout/dashboard";
import Nav from "./layout/nav";
import { ComponentRef, useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Container, Stack, useTheme } from "@mui/material";
import AccountButton from "./component/accountButton";
import LangSwitch from "./lang/langSwitch";

const LeftContent = ({ setOpenLeft }: { setOpenLeft: any }) => (
  <>
    <Box
      sx={(theme) => ({
        width: 270,
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      })}
    />
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
      onClick={() => setOpenLeft(true)}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" color="inherit" component="div">
      MUI-Template
    </Typography>
  </>
);

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
  const [openLeft, setOpenLeft] = useState(false);
  useEffect(() => {
    dashref.current?.log("初始化完成,调用Dashboard的方法,useEffect怎么会调用了两次");
  }, []);
  return (
    <Dashboard
      ref={dashref}
      navComponent={<Nav />}
      headerComponent={
        <Header
          leftContent={<LeftContent setOpenLeft={setOpenLeft} />}
          rightContent={<RightContent />}
        />
      }
      openLeft={openLeft}
      setOpenLeft={setOpenLeft}
    >
      <Container maxWidth="lg" sx={{ marginTop: theme.spacing(4) }}>
        <Typography variant="h2">标题</Typography>
      </Container>
    </Dashboard>
  );
}

export default App;
