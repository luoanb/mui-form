import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

type NavProps = Partial<{
  leftContent: any;
  rightContent: any;
  menuitems: any;
}>;

export default function Nav({
  leftContent,
  rightContent,
  menuitems,
}: NavProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" sx={{ transition: "all .3s" }}>
        <Toolbar sx={{ transition: "all .3s" }}>
          {leftContent}
          <Box sx={{ flexGrow: 1 }} />
          {rightContent}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
