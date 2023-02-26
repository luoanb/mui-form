import React from 'react'
import { useCallback } from 'react'
import { FieldPath, FieldValues, useController } from 'react-hook-form'
import { IFormComponentBase, IFormReturnProps, ReturnComponent } from './type'

/**
 * @description 获取指定filed的错误信息
 * @param name 表单绑定属性
 * @param formStateErrors formState.errors 错误状态
 * @param defaultErrorMessage 默认错误提示
 * @return {} {error:是否错误,helperText:错误提示}
 */
export const getErrorState = (name: string, formStateErrors: any, defaultErrorMessage?: string | JSX.Element) => {
  let errors = formStateErrors
  // 是否错误
  const error = !!errors[name]
  // 错误提示
  const helperText = error ? errors[name]?.message || defaultErrorMessage : ''
  return {
    error,
    helperText
  }
}

/** withControllerFields 附加参数 */
export type IWithControllerFieldsOptions<TForm extends FieldValues = FieldValues, TContext = any> = {
  formProps: IFormReturnProps<TForm, TContext>
}

/** 为组件注入FormStore
 * @description 返回组件的入参 ControllerProps&原始组价入参
 * @description 用户传入参数优先于注入参数
 * @param TForm Form表单类型
 * @param TIFormComponent 外部组件类型
 * @param TContext 框架依赖 未使用
 * @param component 原始组件
 * @param options.formProps 附加参数 react-hook-form.useForm的返回值
 * @return 已注入状态的组件
 */
export function withControllerFields<
  // Form表单类型
  TForm extends FieldValues = FieldValues,
  // 组件 不管泛型any  由外部传递参数决定
  // todo 外部组件继承 IFormComponentBase 为什么IFormComponentBase要实现外部组件所有必填参数
  TIFormComponent extends IFormComponentBase<any, any> = IFormComponentBase<any, any>,
  // 框架依赖 未使用
  TContext = any
>(
  // 原始组件
  Component: TIFormComponent,
  // 附加参数
  { formProps }: IWithControllerFieldsOptions<TForm, TContext>
): ReturnComponent<TForm, FieldPath<TForm>, TIFormComponent> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useCallback(
    ({ otherNames, defaultErrorMessage, ...props }) => {
      const { field } = useController({ ...formProps, ...props })
      // field优先级最低 =>错误状态 => 用户传入
      return (
        <Component
          {...field}
          {...getErrorState(props.name, formProps.formState?.errors, defaultErrorMessage)}
          {...(props as any)}
          onItemChange={(item) => {
            otherNames &&
              Object.keys(otherNames as any).forEach((key) => {
                formProps.setValue((otherNames as any)[key], item?.[key] as any)
              })
            props.onItemChange?.(item)
          }}
        />
      )
    },
    [formProps]
  )
}
