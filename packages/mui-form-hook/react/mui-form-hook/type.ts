import { FieldPath, FieldValues, UseControllerProps, UseFormReturn } from "react-hook-form"

/** 工具 取函数第0个参数 */
export type FunctionsProp0<T extends (...props: any[]) => any> = Parameters<T>[0]

/** 工具 把类型的属性指定为为某个类型
 * @description 把 T 的所有属性置为 V
 */
export type TypeConversion<T, V = any> = {
  [P in keyof T]?: V
}

/** value必须和onChange保持一致 */
export type IChange<T> = ((value: T) => void)


/** Form表单组件入参基本参数
 * @param TValue 组件绑定的数据类型
 */
export type IFormComponentPropsBase<TValue = any, TItem = null> = {
  /** 错误状态 */
  error?: boolean
  /** 组件下提示文本 */
  helperText?: string | JSX.Element
  /** 组件内提示 */
  label?: string | JSX.Element
  /** 表单值 */
  value?: TValue
  /** 更新值 */
  onChange?: IChange<TValue>
  /** 用于Select同时绑定多个Form属性
   * @description 如果需要使用otherNames属性绑定多个属性, 请实现该方法
   */
  onItemChange?: IChange<TItem>
}

/** Form表单组件 */
export type IFormComponentBase<TValue = any, TItem = null> = (props: IFormComponentPropsBase<TValue, TItem>) => JSX.Element

/** Form表单组件入参
 * @description 剔除原始组件的同名参数
 */
export type IFormComponentProps<TProps extends {} = {}, TValue = any, TItem = any> = IFormComponentPropsBase<TValue, TItem> & Partial<Omit<TProps, keyof IFormComponentPropsBase>>

/** Form表单内容Store */
export type IFormReturnProps<TForm extends FieldValues = FieldValues, TContext = any> = UseFormReturn<TForm, TContext>

/** Form 单项可注入参数 */
export type IFormItemProps<TForm extends FieldValues = FieldValues, TName extends FieldPath<TForm> = FieldPath<TForm>> = UseControllerProps<TForm, TName>

/** 返回组件入参 */
export type ReturnComponentProps<
  // Form表单类型
  TForm extends FieldValues = FieldValues,
  // filed路径类型
  TName extends FieldPath<TForm> = FieldPath<TForm>,
  // 组件绑定值类型类型
  TValue = TForm[TName],
  // 
  TItem = null,
  /** 组件原始入参 */
  TFormComponentProps extends IFormComponentPropsBase<TValue, TItem> = IFormComponentPropsBase<TValue, TItem>,
  > = IFormItemProps<TForm, TName> & Omit<TFormComponentProps, keyof IFormItemProps> & {
    defaultErrorMessage?: string | JSX.Element
    /** 同时绑定多个Form属性
   * @description 如果需要使用otherNames属性绑定多个属性, 请在原始组件中实现onItemChange方法
   */
    otherNames?: TypeConversion<TItem, TName>
  }


/** 返回组件 */
export type ReturnComponent<
  // Form表单类型
  TForm extends FieldValues = FieldValues,
  // filed路径类型
  TName extends FieldPath<TForm> = FieldPath<TForm>,
  // 原始组件
  TIFormComponentBase extends IFormComponentBase<any, any> = IFormComponentBase<TForm[TName], null>
  > = (props: Omit<Parameters<TIFormComponentBase>[0], keyof IFormItemProps> & IFormItemProps<TForm, TName> & {
    defaultErrorMessage?: string | JSX.Element
    /** 同时绑定多个Form属性
   * @description 如果需要使用otherNames属性绑定多个属性, 请在原始组件中实现onItemChange方法
   */
    otherNames?: TypeConversion<Parameters<TIFormComponentBase>[0]["onItemChange"] extends IChange<any> ? Parameters<Parameters<TIFormComponentBase>[0]["onItemChange"]>[0] : { [props: string]: any }, TName>
  }) => JSX.Element

// todo Parameters会使得入参的自动匹配读取失效
// Parameters<TIFormComponentBase>[0]


