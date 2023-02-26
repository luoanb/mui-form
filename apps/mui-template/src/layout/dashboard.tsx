import { PropsWithChildren, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useTheme } from "@mui/material/styles";
import { Box, Drawer } from "@mui/material";
export interface MainProps extends PropsWithChildren {
  leftComponent: any;
  openLeft: boolean;
  navComponent: any;
  setOpenLeft: (status: boolean) => void;
}
export default function Dashboard({
  leftComponent,
  children,
  openLeft,
  navComponent,
  setOpenLeft,
}: MainProps) {
  const theme = useTheme();

  return (
    <Box
      className="App"
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {navComponent}
      <Box
        sx={{
          height: 0,
          flex: 1,
          display: "flex",
        }}
      >
        <Grid
          sx={{
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
            [theme.breakpoints.up("md")]: {
              width: 280,
            },
            boxShadow: theme.shadows[10],
          }}
        >
          {leftComponent}
        </Grid>
        <Grid>{children}</Grid>
      </Box>
      <Drawer open={openLeft} onClose={() => setOpenLeft(false)}>
        <Box sx={{ height: "100%", width: 280 }}>{leftComponent}</Box>
      </Drawer>
    </Box>
  );
}
