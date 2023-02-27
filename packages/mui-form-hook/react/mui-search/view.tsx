import React from 'react'
import { PopperPlacementType } from '@mui/material'
import { DataGridProps, GridColumns, GridEventListener, GridEvents } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { DropDownInput, DropDownInputProps } from './dropdown-input'
import { MuiDataGrid } from './mui-datagrid'
import { createDebounce } from './tools'

/** mui DataGrid 数据必须有id */
export type IDataItem = {
  id: any
}

export type MuiSearchProps<T extends IDataItem = any> = {
  /** 列定义 */
  columns: GridColumns
  /** 获取数据方法 */
  getDataList: (value: string) => Promise<T[]>
  /** 点击事件 */
  onRowClick?: GridEventListener<GridEvents.rowClick>
  /** 下拉框位置
   * @default "bottom"
   */
  placement?: PopperPlacementType

  dataGridWidth?: any

  dataGridHeight?: any

  /** 输入框value */
  inputValue?: string

  /** 输入框valueChange */
  onInputChange?: (value: string) => void
} & Omit<DropDownInputProps, 'value' | 'onChange' | 'variant' | 'downRander'>

const options: Partial<DataGridProps> = {
  hideFooter: true,
  hideFooterPagination: true,
  // hideFooterRowCount: true,
  hideFooterSelectedRowCount: true,
  headerHeight: 40,
  rowHeight: 40
}

export const downRander = ({ close, columns, rows, onRowClick, width, height }: any) => {
  return (
    <div style={{ width, height }}>
      <MuiDataGrid
        {...options}
        onRowClick={(...props) => {
          close()
          onRowClick?.(...props)
        }}
        columns={columns}
        rows={rows}
      />
    </div>
  )
}

const debounce = createDebounce()

/** 用于搜索 不支持回显 */
export const MuiSearch = <T extends IDataItem>({
  columns,
  onRowClick,
  getDataList,
  inputValue,
  onInputChange,
  placement,
  dataGridWidth = 500,
  dataGridHeight = 250,
  ...props
}: MuiSearchProps<T>) => {
  const [innerValue, setInnerValue] = useState('')
  const [data, setData] = useState<T[]>([])

  // 优先使用外部入参
  const value = typeof inputValue === 'undefined' ? innerValue : inputValue
  const setValue = typeof inputValue === 'undefined' ? setInnerValue : onInputChange

  useEffect(() => {
    debounce(async () => {
      let res = await getDataList(value)
      setData(res)
    })
  }, [value])

  const dataRander = ({ close }: any) =>
    downRander({
      close,
      rows: data,
      columns,
      onRowClick,
      width: dataGridWidth,
      height: dataGridHeight
    })
  return (
    <DropDownInput
      {...props}
      value={value}
      placement={placement}
      onChange={(e) => {
        setValue?.(e.target.value)
      }}
      downRander={dataRander}
    />
  )
}
