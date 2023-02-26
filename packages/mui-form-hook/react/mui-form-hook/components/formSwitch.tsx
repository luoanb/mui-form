import React from 'react'
import { Switch, SwitchProps, FormControlLabel, FormControlLabelProps } from '@mui/material'
import { IFormComponentProps } from '../type'

/** 开关入参
 * @implements SwitchProps
 * @implements IFormComponentPropsBase
 * @param labelProps FormControlLabelProps
 */
export type BaseFormSwitchProps = IFormComponentProps<
  SwitchProps & {
    labelProps: FormControlLabelProps
  },
  boolean,
  null
>

/** 开关
 * @implements Switch FormControlLabel
 * @param prop BaseFormSwitchProps
 */
export const BaseFormSwitch = ({ value, labelProps, onChange, ...prop }: BaseFormSwitchProps) => {
  return (
    <FormControlLabel {...labelProps} label={labelProps?.label} control={<Switch {...prop} checked={value} onChange={(...props) => onChange?.(props[1])} />} />
  )
}
