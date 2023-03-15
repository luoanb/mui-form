import { useTheme } from "@emotion/react";
import {
  createTheme,
  ThemeProvider,
  styled,
  ThemeOptions,
} from "@mui/material/styles";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import customShadows from "./customShadows";
import palette from "./palette";
import shadows from "./shadows";
import typography from "./typography";
// import { orange } from "@mui/material/colors";

/**
 * 附加主题变量
 */
type CustomShadow = ReturnType<typeof customShadows>;
declare module "@mui/material/styles" {
  interface Theme {
    customShadows: CustomShadow;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows: CustomShadow;
  }
}

const themeOptions: ThemeOptions = {
  palette,
  shadows: shadows(),
  typography,
  shape: { borderRadius: 6 },
  customShadows: customShadows(),
};

/**
 * 主题hook
 * @param defaultTheme
 * @returns
 */
const useThemeValue = (defaultThemeOptions = themeOptions) => {
  const [theme, setTheme] = useState(createTheme(defaultThemeOptions));
  const setThemeByOptions = useCallback(
    (themeOptions: ThemeOptions) => {
      setTheme(createTheme(themeOptions));
    },
    [setTheme]
  );
  return {
    theme,
    setTheme,
    setThemeByOptions,
  };
};

export type ThemeValue = ReturnType<typeof useThemeValue>;

/**
 * 主题context
 */
export const themeValueContext = createContext<ThemeValue>(null as any); // 去掉null验证

/**
 * 获取主题Context Hook
 */
export const useThemeContext = () => {
  return useContext(themeValueContext);
};

/**
 * 主题Provideer
 * @param param0
 * @returns
 */
export const ThemeValueProvider = ({ children }: PropsWithChildren) => {
  const themeValue = useThemeValue();
  return (
    <themeValueContext.Provider value={themeValue}>
      <ThemeProvider theme={themeValue.theme}>{children}</ThemeProvider>
    </themeValueContext.Provider>
  );
};
