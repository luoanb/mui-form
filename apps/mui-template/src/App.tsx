import Header from "./layout/header";
import Dashboard from "./layout/dashboard";
import Nav from "./layout/nav";
import { ComponentRef, useContext, useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";

import { Container, useTheme } from "@mui/material";

function App() {
  const dashref = useRef<ComponentRef<typeof Dashboard>>(null);
  const theme = useTheme();
  useEffect(() => {
    dashref.current?.log(
      "初始化完成,调用Dashboard的方法,useEffect怎么会调用了两次"
    );
  }, []);
  return (
    <Dashboard ref={dashref} nav={<Nav />} header={<Header />}>
      <Container maxWidth="lg" sx={{ marginTop: theme.spacing(4) }}>
        <Typography variant="h2">标题</Typography>
      </Container>
    </Dashboard>
  );
}

export default App;
