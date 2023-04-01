import * as Style from '@mui/material/styles'
import customShadows from './normal/customShadows'

/**
 * 附加主题变量
 */
type CustomShadow = ReturnType<typeof customShadows>

declare module '@mui/material/styles' {
  interface Theme {
    customShadows?: CustomShadow
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows?: CustomShadow
  }
}
