import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { DropDownInput } from './dropdown-input'
import { MuiFormSearch } from './mui-form-search'
import { MuiSearch } from './view'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'

const TestComponent = () => {
  return <div>666</div>
}
const batchColumns: GridColDef[] = [
  { headerName: '名称', width: 100, field: 'name' },
  { headerName: 'ID', width: 90, field: 'id' }
]

const getData = async (value) => {
  console.log('触发搜索', value)
  return [
    { name: '小明', id: '1' },
    { name: '小明2', id: '2' }
  ]
}

export const Test = () => {
  const [value, onValueChange] = useState(null)
  return (
    <div>
      <DropDownInput downRander={TestComponent} placement="bottom" />
      <MuiSearch placement="bottom-start" columns={batchColumns} getDataList={getData}/>
      <MuiFormSearch
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        placeholder="请输入住院号或姓名查找"
        placement="bottom-end"
        columns={batchColumns}
        value={value}
        onValueChange={onValueChange}
        getDataList={getData}
      />
      <div>MuiFormSearch:{JSON.stringify(value)}</div>
    </div>
  )
}
