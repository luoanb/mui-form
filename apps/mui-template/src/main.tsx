import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeValueProvider } from "mui-layout";
import "./index.css";
import Style from "./style";
import "virtual:svg-icons-register";
import "./lang";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeValueProvider>
      <CssBaseline />
      <Style />
      <App />
    </ThemeValueProvider>
  </React.StrictMode>
);
// "@mui/icons-material": "^5.4.2",
