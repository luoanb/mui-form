import React, { useState } from 'react'
import { MuiFormSearch, MuiFormSearchProps } from '../../mui-search/mui-form-search'
import { IFormComponentProps } from '../type'

// todo typescript坑 withControllerFields 不能实现外部组件的必填属性 必填属性需要提前提供默认实现

/**
 * Description placeholder
 * @date 2023/4/1 - 16:54:02
 *
 * @export
 * @typedef {IBaseFormSearchProps}
 * @template TV
 * @template TI
 */
export type IBaseFormSearchProps<TV = any, TI = any> = IFormComponentProps<MuiFormSearchProps<TV>, TV, TI>


/**
 * Description placeholder
 * @date 2023/4/1 - 16:54:24
 * @formBase
 * @template TV
 * @template TI
 * @param {IBaseFormSearchProps<TV, TI>} {
  onItemChange,
  onRowClick,
  columns = [],
  getDataList = async () => [],
  ...props
}
 * @returns {*}
 */
export const BaseFormSearch = <TV extends any = any, TI = any>({
  onItemChange,
  onRowClick,
  columns = [],
  getDataList = async () => [],
  ...props
}: IBaseFormSearchProps<TV, TI>) => {
  const defaultValueChange = () => {
    throw new Error('请实现onChange或onValueChange方法')
  }
  const [innerInputValue, setInnerInputValue] = useState('')
  const inputValue = typeof props.inputValue === 'undefined' ? innerInputValue : props.inputValue
  const onInputChange = typeof props.inputValue === 'undefined' ? setInnerInputValue : props.onInputChange

  const [innerValue, setInnerValue] = useState<any>({})
  const value = typeof props.value === 'undefined' ? innerValue : props.value
  const onValueChange = typeof props.value === 'undefined' ? setInnerValue : props.onValueChange || props.onChange || defaultValueChange
  return (
    <MuiFormSearch
      {...props}
      columns={columns}
      inputValue={inputValue}
      onInputChange={onInputChange}
      value={value}
      getDataList={getDataList}
      onValueChange={onValueChange}
      onRowClick={(p, e, d) => {
        onItemChange?.(p.row)
        onRowClick?.(p, e, d)
      }}
    />
  )
}
