import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import customShadows from "./customShadows";
import palette from "./palette";
import shadows from "./shadows";
import typography from "./typography";
// import { orange } from "@mui/material/colors";

/**
 * 附加主题变量
 */
type CustomShadow = ReturnType<typeof customShadows>
declare module '@mui/material/styles' {
  interface Theme {
    customShadows: CustomShadow;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows: CustomShadow;
  }
}

const theme = createTheme({
  palette,
  shadows:shadows(),
  typography,
  shape: { borderRadius: 6 },
  customShadows: customShadows()
});

export default theme;
