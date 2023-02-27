import React from 'react'
import { Checkbox, CheckboxProps, FormControlLabel, FormControlLabelProps } from '@mui/material'
import { IFormComponentProps } from '../type'

/** 复选框入参
 * @implements CheckboxProps
 * @implements IFormComponentPropsBase
 * @param labelProps FormControlLabelProps
 */
export type BaseFormCheckboxProps = IFormComponentProps<
  CheckboxProps & {
    labelProps: FormControlLabelProps
  },
  boolean,
  null
>

/** 复选框
 * @implements Checkbox FormControlLabel
 * @param prop BaseFormCheckboxProps
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
