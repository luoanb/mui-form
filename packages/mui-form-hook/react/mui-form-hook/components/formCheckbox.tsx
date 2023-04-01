import React from 'react'
import { Checkbox, CheckboxProps, FormControlLabel, FormControlLabelProps } from '@mui/material'
import { IFormComponentProps } from '../type'

/**
 * BaseFormCheckbox Component Props; extends CheckboxProps and IFormComponentProps
 * @date 2023/4/1 - 16:49:21
 *
 * @export
 * @typedef {BaseFormCheckboxProps}
 */
export type BaseFormCheckboxProps = IFormComponentProps<
  CheckboxProps & {
    labelProps: FormControlLabelProps
  },
  boolean,
  null
>

/**
 * BaseFormCheckbox extends MUI.FormControlLabel
 * @date 2023/4/1 - 16:48:06
 * @formBase
 * @param {BaseFormCheckboxProps} { value, label, labelProps, onChange, ...prop }
 * @returns {*}
 */
export const BaseFormCheckbox = ({ value, label, labelProps, onChange, ...prop }: BaseFormCheckboxProps) => {
  return (
    <FormControlLabel
      {...labelProps}
      label={labelProps?.label || label}
      control={<Checkbox {...prop} checked={value} onChange={(...props) => onChange?.(props[1])} />}
    />
  )
}
