import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./design";
import "./index.css";
import Style from "./style";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Style />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
// "@mui/icons-material": "link:..\\..\\node_modules\\@mui\\icons-material",