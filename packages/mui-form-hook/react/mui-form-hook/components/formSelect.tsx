import React from 'react'
import { FormControl, FormControlProps, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material'
import { IFormComponentProps } from '../type'

// export type BaseSelectProps<TItem = any, TValue = any, K extends keyof TItem = keyof TItem> = SelectProps<TValue> &
//   FormControlProps &
//   IFormComponentPropsBase<TValue> & {
//     data?: TItem[]
//     keyExpr?: K
//     displayExpr?: K
//     onItemClick?: (e, item: TItem) => void
//   }

/**
 * 选择器入口参数
 * @date 2023/4/1 - 16:58:33
 *
 * @export
 * @typedef {BaseSelectProps}
 * @template TItem typeof select item
 * @template TValue typeof select value
 * @template K 
 * @template K2
 */
export type BaseSelectProps<
  TItem extends { [props: string]: any } = { [props: string]: any },
  TValue = any,
  K extends keyof TItem = keyof TItem,
  K2 extends keyof TItem = keyof TItem
> = IFormComponentProps<
  SelectProps<TValue> &
    FormControlProps & {
      data?: TItem[]
      keyExpr?: K
      displayExpr?: K2
      onItemClick?: (e: any, item: TItem) => void
    },
  TValue,
  TItem
>


/**
 * 选择器基础封装
 * @date 2023/4/1 - 16:57:58
 * @formBase
 * @template T typeof item
 * @template V typeof value
 * @param {BaseSelectProps<T, V>} {
  data = [],
  label,
  fullWidth,
  size,
  keyExpr = 'id',
  error,
  displayExpr = 'name',
  helperText,
  style,
  onChange,
  onItemChange,
  onItemClick,
  ...props
}
 * @returns {*}
 */
export const BaseSelect = <T extends { [props: string]: any } = { [props: string]: any }, V = any>({
  data = [],
  label,
  fullWidth,
  size,
  keyExpr = 'id',
  error,
  displayExpr = 'name',
  helperText,
  style,
  onChange,
  onItemChange,
  onItemClick,
  ...props
}: BaseSelectProps<T, V>) => {
  return (
    <FormControl fullWidth={fullWidth} style={style} size={size} error={!!error}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select {...props} label={label} onChange={(e) => onChange?.(e.target["value"] as V)}>
        {data.map((item) => (
          <MenuItem
            key={item[keyExpr]}
            value={item[keyExpr]}
            onClick={(e) => {
              onItemClick?.(e, item)
              onItemChange?.(item)
            }}
          >
            {item[displayExpr]}
          </MenuItem>
        ))}
      </Select>
      {helperText ? <FormHelperText error={!!error}>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}
