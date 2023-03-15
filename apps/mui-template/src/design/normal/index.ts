import { ThemeOptions } from "@mui/material";
import customShadows from "./customShadows";
import palette from "./palette";
import shadows from "./shadows";
import typography from "./typography";

export const normal: () => ThemeOptions = () => ({
  palette,
  shadows: shadows(),
  typography,
  shape: { borderRadius: 6 },
  customShadows: customShadows(),
});