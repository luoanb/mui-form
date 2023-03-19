import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useContext } from "react";
import { DashboardState, useResponsive } from "mui-layout";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import LangSwitch from "../lang/langSwitch";
import AccountButton from "../component/accountButton";

export default function Header() {
  const { miniNav, setOpenNav, setMiniNav } = useContext(DashboardState);
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" sx={(t) => ({ pl: 0 })}>
        <Toolbar sx={{ pl: "0 !important" }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: "100%" }}
            justifyContent="center"
          >
            <Collapse
              orientation="horizontal"
              in={!(useResponsive("down", "md") || !miniNav)}
            >
              <Box
                sx={{
                  width: 260,
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
                })}
                onClick={() => setMiniNav((old) => !old)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box alignItems="center" display="flex">
              <Typography variant="h6" color="inherit">
                MUI-Template
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <LangSwitch />
            <AccountButton />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
