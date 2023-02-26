import { TextField } from "@mui/material"
import { FieldValues, useForm, UseFormProps } from "react-hook-form"
import { BaseFormCheckbox, BaseFormSwitch, Region } from "./components"
import { BaseFormSearch } from "./components/formSearch"
import { BaseSelect } from "./components/formSelect"
import { withControllerFields } from "./tools"

export * from "./type"
export * from './tools'
export * from "./components"

/** 组件集成 react-hook-form 和 mui组件  */
export const useFormComponent = <TForm extends FieldValues = FieldValues, TContext = any>(props?: UseFormProps<TForm, TContext>) => {
  const formProps = useForm<TForm, TContext>(props)
  const FormText = withControllerFields(TextField, { formProps })
  const FormSelect = withControllerFields(BaseSelect, { formProps })
  const FormSearch = withControllerFields(BaseFormSearch, { formProps })
  const FormCheckbox = withControllerFields(BaseFormCheckbox, { formProps })
  const FormSwitch = withControllerFields(BaseFormSwitch, { formProps })
  const FormRegion = withControllerFields(Region, { formProps })
  return {
    // 结构抛出
    ...formProps,
    // 统一抛出
    formProps,
    // TextField
    FormText,

    FormSelect,

    FormSearch,

    FormCheckbox,

    FormSwitch,

    FormRegion
  }
}
