// @mui
import { Breakpoint, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ----------------------------------------------------------------------


/**
 * 媒体查询工具
 * @date 2023/4/1 - 17:31:02
 *
 * @export
 * @template T
 * @param {T} query
 * @param {(number | Breakpoint)} start
 * @param {?(number | Breakpoint)} [end]
 * @returns {*}
 */
export function useResponsive<T extends "up" | "down" | "between">(query: T, start: number | Breakpoint, end?: number | Breakpoint) {
  const theme:any = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end as any));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start as any));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}
export default useResponsive

