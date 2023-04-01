import React, { useEffect, useState } from 'react'
import { IDataItem, MuiSearch, MuiSearchProps } from './view'

/** MuiFormSearch 入参 */
export interface MuiFormSearchProps<T = any> extends MuiSearchProps<T & IDataItem> {
  /** 下拉选框单项 非id */
  value: T

  /** key键
   * @default "id"
   */
  keyExpr?: string

  /** 展示键
   * @default "name"
   */
  displayExpr?: string

  /** 更新value值 */
  onValueChange: (value: T) => void
}


/**
 * 用于表单中的搜索组件
 * @date 2023/4/1 - 17:20:58
 * @formBase
 * @param {MuiFormSearchProps} {
  value,
  keyExpr = 'id',
  displayExpr = 'name',
  // inputValue,
  // onInputChange,
  onValueChange,
  getDataList,
  onRowClick,
  ...props
}
 * @returns {*}
 */
export const MuiFormSearch = ({
  value,
  keyExpr = 'id',
  displayExpr = 'name',
  // inputValue,
  // onInputChange,
  onValueChange,
  getDataList,
  onRowClick,
  ...props
}: MuiFormSearchProps) => {
  const [innerValue, setInnerValue] = useState('')
  // 判断外部实没有控制输入框的值时使用内部状态
  const isnotHaveValue = typeof props.inputValue === 'undefined'
  const inputValue = isnotHaveValue ? innerValue : props.inputValue
  const onInputChange = isnotHaveValue ? setInnerValue : props.onInputChange
  useEffect(() => {
    let displayValue = value?.[displayExpr] || ''
    if (displayValue !== inputValue) {
      onInputChange?.(displayValue)
    }
  }, [value])
  return (
    <MuiSearch
      {...props}
      getDataList={async (value) => {
        let res = await getDataList(value)
        return res?.map((item) => ({ ...item, id: item[keyExpr] }))
      }}
      inputValue={inputValue}
      onInputChange={onInputChange}
      onRowClick={(p, e, d) => {
        onValueChange?.(p.row)
        onInputChange?.(p.row?.[displayExpr])
        onRowClick?.(p, e, d)
      }}
    />
  )
}
