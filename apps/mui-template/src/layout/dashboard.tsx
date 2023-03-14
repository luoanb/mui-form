import { createContext, PropsWithChildren, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useTheme } from "@mui/material/styles";
import { Box, Collapse, Drawer } from "@mui/material";
import { defineComponent } from "ref-component";
import { DashState, useDashState } from "./useDashState";
export interface MainProps extends PropsWithChildren {
  header: any;
  nav: any;
}

/**
 * Dashboard 公用一个状态
 */
export const DashboardState = createContext<DashState>(null as any);

const Dashboard = defineComponent(({ header, children, nav }: MainProps) => {
  const dashState = useDashState();
  const theme = useTheme();
  return {
    log: console.log,
    element: (
      <DashboardState.Provider value={dashState}>
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
          {header}
          <Box
            sx={{
              height: 0,
              flex: 1,
              display: "flex",
            }}
          >
            <Collapse
              sx={{
                [theme.breakpoints.down("md")]: {
                  display: "none",
                },
                boxShadow: theme.shadows[10],
              }}
              orientation="horizontal"
              in={dashState.miniNav}
              // in={true}
              collapsedSize={65}
            >
              {nav}
            </Collapse>

            <Grid flex={1}>{children}</Grid>
          </Box>
          <Drawer
            open={dashState.openNav}
            onClose={() => dashState.setOpenNav(false)}
          >
            <Box sx={{ height: "100%", width: 280 }}>{nav}</Box>
          </Drawer>
        </Box>
      </DashboardState.Provider>
    ),
  };
});
export default Dashboard;
// export default
