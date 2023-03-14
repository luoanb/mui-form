import { PropsWithChildren, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useTheme } from "@mui/material/styles";
import { Box, Drawer } from "@mui/material";
import { defineComponent } from "define-component";
export interface MainProps extends PropsWithChildren {
  headerComponent: any;
  openLeft: boolean;
  navComponent: any;
  setOpenLeft: (status: boolean) => void;
}

const Dashboard = defineComponent(
  ({
    headerComponent,
    children,
    openLeft,
    navComponent,
    setOpenLeft,
  }: MainProps) => {
    const theme = useTheme();
    return {
      log: console.log,
      element: (
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
          {headerComponent}
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
              {navComponent}
            </Grid>
            <Grid flex={1}>{children}</Grid>
          </Box>
          <Drawer open={openLeft} onClose={() => setOpenLeft(false)}>
            <Box sx={{ height: "100%", width: 280 }}>{navComponent}</Box>
          </Drawer>
        </Box>
      ),
    };
  }
);
export default Dashboard;
// export default
