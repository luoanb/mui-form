import { Container } from "@mui/material";
import { Dashboard } from "mui-layout-component";
import { Outlet } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

import Header from "../layout/header";
import Nav from "../layout/nav";
import { Design } from "../design/design";

export const RouterDashboard = () => {
  return (
    <Dashboard nav={<Nav />} header={<Header />} design={<Design />}>
      <Container maxWidth="lg" sx={(theme) => ({ pt: theme.spacing(4) })}>
        <Outlet />
      </Container>
    </Dashboard>
  );
};

export const RouterEmpty = () => <Outlet />;

// ** Types

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: "100vh",

  // For V1 Blank layout pages
  "& .content-center": {
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(5),
  },

  // For V2 Blank layout pages
  "& .content-right": {
    display: "flex",
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
  },
}));

export const BlankLayout = () => {
  return (
    <BlankLayoutWrapper className="layout-wrapper">
      <Box
        className="app-content"
        sx={{ minHeight: "100vh", overflowX: "hidden", position: "relative" }}
      >
        <Outlet />
      </Box>
    </BlankLayoutWrapper>
  );
};
