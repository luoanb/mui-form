import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useContext } from "react";
import { DashboardState } from "./dashboard";
import useResponsive from "./useResponsive";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import LangSwitch from "../lang/langSwitch";
import AccountButton from "../component/accountButton";

// export type NavProps = Partial<{
//   leftContent: any;
//   rightContent: any;
//   menuitems: any;
// }>;

export default function Header() {
  const { miniNav } = useContext(DashboardState);
  const { setOpenNav, setMiniNav } = useContext(DashboardState);
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" sx={{ transition: "all .3s" }}>
        <Toolbar sx={{ root: { paddingLeft: 0 } }}>
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
