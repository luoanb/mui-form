import React from 'react'
import { Box, List, ListItemText } from '@mui/material'
import { StyledNavItem, StyledNavItemIcon } from './navItem'



/**
 * 目录树
 * @date 2023/4/1 - 17:32:39
 * @deprecated
 * @export
 * @param {*} { data = [], ...other }
 * @returns {*}
 */
export function NavSection({ data = [], ...other }: any) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item: any) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  )
}

// ----------------------------------------------------------------------

/**
 * 目录树单项
 * @date 2023/4/1 - 17:33:30
 * @deprecated
 *
 * @export
 * @param {*} { item }
 * @returns {*}
 */
export function NavItem({ item }: any) {
  const { title, path, icon, info } = item
  return (
    <StyledNavItem
      // component={RouterLink}
      // to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold'
        }
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  )
}
