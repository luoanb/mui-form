import React from 'react'
import { Button } from '@mui/material'
import { useFormComponent } from './index'

export interface NChangeWardBedInput {
  /** 转入床位Id */
  wardBedId?: string | undefined
  /** 换床时间 */
  changeTime?: Date
  /** 住院信息id */
  iHid?: string | undefined
}

/** 获取默认表单值 */
export const getDefaultFormData = () =>
  ({
    /** 转入床位Id */
    wardBedId: '',
    /** 换床时间 */
    changeTime: new Date(),
    /** 住院信息id */
    iHid: ''
  } as NChangeWardBedInput)

export const Test = () => {
  const { FormText, handleSubmit } = useFormComponent<NChangeWardBedInput>({
    defaultValues: getDefaultFormData()
  })
  return (
    <div>
      <FormText name="iHid" variant="outlined" rules={{ required: '请输入' }} />
      <FormText name="wardBedId" variant="outlined" rules={{ required: '请输入' }} />
      <Button onClick={handleSubmit((data) => console.log(data))}>提交</Button>
    </div>
  )
}
