import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles'
import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react'
import { normal } from './normal'

/**
 * 主题hook
 * @param defaultTheme
 * @returns
 */
const useThemeValue = (defaultThemeOptions = normal()) => {
  const [theme, setTheme] = useState(createTheme(defaultThemeOptions))

  const setThemeByOptions = useCallback(
    (themeOptions: Partial<ThemeOptions>) => {
      setTheme(createTheme(themeOptions))
    },
    [setTheme]
  )

  return {
    theme,
    setTheme,
    setThemeByOptions
  }
}

export type ThemeValue = ReturnType<typeof useThemeValue>

/**
 * 主题context
 */
export const themeValueContext = createContext<ThemeValue>(null as any) // 去掉null验证

/**
 * 获取主题Context Hook
 */
export const useThemeContext = () => {
  return useContext(themeValueContext)
}

/**
 * 主题Provideer
 * @param param0
 * @returns
 */
export const ThemeValueProvider = ({ children }: PropsWithChildren) => {
  const themeValue = useThemeValue()
  return (
    <themeValueContext.Provider value={themeValue}>
      <ThemeProvider theme={themeValue.theme}>{children}</ThemeProvider>
    </themeValueContext.Provider>
  )
}
