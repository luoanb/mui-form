import Nav from "./layout/nav";
import Dashboard from "./layout/dashboard";
import Left from "./layout/left";
import Box from "@mui/material/Box";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material";

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
      内容
    </Dashboard>
  );
}

export default App;
