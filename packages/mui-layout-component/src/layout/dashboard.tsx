import React, { createContext, PropsWithChildren, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import { Box, Collapse, Drawer } from '@mui/material'
import { defineComponent } from 'ref-component'
import SpeedDial from '@mui/material/SpeedDial'
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining'
import { DashState, useDashState } from './useDashState'
import { Design } from '../design/design'
export interface MainProps extends PropsWithChildren {
  header: any
  nav: any
  design?: any
}

/**
 * Dashboard 公用一个状态
 */
export const DashboardState = createContext<DashState>(null as any)


/**
 * Dashboard 
 * @date 2023/4/1 - 17:28:41
 * @param MainProps
 *
 * @type {*}
 */
export const Dashboard = defineComponent(({ header, children, nav, design = <Design /> }: MainProps) => {
  const dashState = useDashState()
  return {
    log: console.log,
    element: (
      <DashboardState.Provider value={dashState}>
        <Box
          className="App"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          {header}
          <Box
            sx={{
              height: 0,
              flex: 1,
              display: 'flex'
            }}
          >
            <Collapse
              sx={(theme) => ({
                [theme.breakpoints.down('md')]: {
                  display: 'none'
                },
                overflowY: 'auto',
                boxShadow: theme.shadows[10]
              })}
              orientation="horizontal"
              in={dashState.miniNav}
              // in={true}
              collapsedSize={65}
            >
              {nav}
            </Collapse>

            <Grid sx={{ overflowY: 'auto' }} flex={1}>
              {children}
            </Grid>
            <Collapse in={dashState.openDesign} orientation="horizontal" sx={(theme) => ({ boxShadow: theme.shadows[10] })}>
              {design}
            </Collapse>
          </Box>
          <Drawer open={dashState.openNav} onClose={() => dashState.setOpenNav(false)}>
            <Box sx={{ height: '100%', width: 280 }}>{nav}</Box>
          </Drawer>
          <SpeedDial
            onClick={() => dashState.setOpenDesign((old) => !old)}
            sx={{ position: 'absolute', bottom: 28, right: 28 }}
            ariaLabel="Theme Design"
            direction="left"
            icon={<BreakfastDiningIcon />}
          ></SpeedDial>
        </Box>
      </DashboardState.Provider>
    )
  }
})
export default Dashboard
// export default
