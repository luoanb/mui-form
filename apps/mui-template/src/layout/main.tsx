import { PropsWithChildren, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useTheme } from "@mui/material/styles";
import { Box, Drawer } from "@mui/material";
interface MainProps extends PropsWithChildren {
  leftComponent: any;
  openLeft: boolean;
  setOpenLeft: (status: boolean) => void;
}
export default function Main({
  leftComponent,
  children,
  openLeft,
  setOpenLeft,
}: MainProps) {
  const theme = useTheme();

  return (
    <>
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
    </>
  );
}
