import Nav from "./layout/nav";
import Dashboard from "./layout/dashboard";
import Left from "./layout/left";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container, useTheme } from "@mui/material";

function App() {
  const theme = useTheme();
  const [openLeft, setOpenLeft] = useState(false);
  return (
    <Dashboard
      leftComponent={<Left />}
      navComponent={
        <Nav
          leftContent={
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  mr: 2,
                  [theme.breakpoints.up("md")]: {
                    display: "none",
                  },
                  md: { display: "block" },
                }}
                onClick={() => setOpenLeft(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" component="div">
                MUI-Form-Hook
              </Typography>
            </>
          }
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
