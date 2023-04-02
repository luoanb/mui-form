import React from 'react'
import { DataGrid, DataGridProps } from '@mui/x-data-grid'

/**
 * 优化样式后的DataGrid
 * @date 2023/4/1 - 17:20:14
 *
 * @param {DataGridProps} props
 * @returns {*}
 */
export const MuiDataGrid = (props: DataGridProps) => {
  return (
    <DataGrid
      {...props}
      sx={(t) => ({
        // border: 0,
        zIndex: 999,
        color: t.palette.text.primary,
        WebkitFontSmoothing: 'auto',
        background: t.palette.background.paper,
        letterSpacing: 'normal',
        '& .MuiDataGrid-columnsContainer': {
          backgroundColor: t.palette.background.default
        },
        '& .MuiDataGrid-iconSeparator': {
          display: 'none'
        },
        '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
          borderRight: `1px solid f0f0f0`
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
          borderBottom: `1px solid f0f0f0`
        },
        '& .MuiDataGrid-cell': {
          color: t.palette.text.primary
        },
        '& .MuiPaginationItem-root': {
          borderRadius: 0
        }
      })}
    />
  )
}
