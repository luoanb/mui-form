import Header from "./layout/header";
import Dashboard from "./layout/dashboard";
import Nav from "./layout/nav";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Container, useTheme } from "@mui/material";
import AccountButton from "./component/accountButton";

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
    <>
      <AccountButton />
    </>
  );
};

function App() {
  const theme = useTheme();
  const [openLeft, setOpenLeft] = useState(false);
  return (
    <Dashboard
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
