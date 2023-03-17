import React from 'react'
import { Box, List, ListItemText } from '@mui/material'
import { StyledNavItem, StyledNavItemIcon } from './navItem'

// ----------------------------------------------------------------------

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
