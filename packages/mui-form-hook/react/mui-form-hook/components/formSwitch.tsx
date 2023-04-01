import React from 'react'
import { Switch, SwitchProps, FormControlLabel, FormControlLabelProps } from '@mui/material'
import { IFormComponentProps } from '../type'


/**
 * BaseFormSwitch Props
 * @date 2023/4/1 - 17:02:59
 *
 * @export
 * @typedef {BaseFormSwitchProps}
 */
export type BaseFormSwitchProps = IFormComponentProps<
  SwitchProps & {
    labelProps: FormControlLabelProps
  },
  boolean,
  null
>


/**
 * 开关 implementat by MUI.FormControlLabel and MUI.Switch
 * @date 2023/4/1 - 17:01:09
 * @formBase
 * @param {BaseFormSwitchProps} { value, labelProps, onChange, ...prop }
 * @returns {*}
 */
export const BaseFormSwitch = ({ value, labelProps, onChange, ...prop }: BaseFormSwitchProps) => {
  return (
    <FormControlLabel {...labelProps} label={labelProps?.label} control={<Switch {...prop} checked={value} onChange={(...props) => onChange?.(props[1])} />} />
  )
}
