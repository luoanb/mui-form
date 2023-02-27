# MUI Form Hook

* 基于[MUI](https://mui.com/)组件库上层封装，为了使MUI更易用，更符合国内使用习惯
* MUI相关基础库都未打包，所以使用mui-form-hook时，同时需要下载MUI基础包，具体[参见如下](./readme.md#peerdependencies)

# PeerDependencies

请确保您的代码仓库中已经存在以下依赖

```JSON
"peerDependencies": {
  "@types/react": "^17.0.0 || ^18.0.0",
  "react": "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0",
  "react-hook-form": "^7.30.0",
  "@mui/icons-material": "^5.4.2",
  "@mui/material": "^5.4.2",
  "@mui/lab": "^5.0.0-alpha.83",
  "@mui/x-data-grid": "^5.8.0"
},
```

# Useage 使用

- Download 下载

```shell
# 分开下载
  yarn add mui-form-hook 
  yarn add @types/react@18.2.0
  yarn add react-dom@18.2.0
  yarn add react-hook-form@7.30.0
  yarn add @mui/icons-material@5.4.2
  yarn add @mui/material@5.4.2
  yarn add @mui/lab@5.0.0-alpha.83
  yarn add @mui/x-data-grid@5.8.0

# 一次下载
yarn add mui-form-hook  @types/react@18.2.0 react-dom@18.2.0 react-hook-form@7.30.0 @mui/icons-material@5.4.2 @mui/material@5.4.2 @mui/lab@5.0.0-alpha.83 @mui/x-data-grid@5.8.0
```

- Example 示例

```jsx
import React from 'react'
import { Button } from '@mui/material'
import { useFormComponent } from 'mui-form-hook'


/** 类型声明 */
export interface NChangeWardBedInput {
  wardBedId?: string | undefined
  changeTime?: Date
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
  // 创建表单及其相关组件和api(和 useForm入参相同)
  const { FormText, handleSubmit } = useFormComponent<NChangeWardBedInput>({
    // 设置默认值
    defaultValues: getDefaultFormData()
  })
  return (
    <div>
      <FormText
        name="iHid" // 绑定表单属性
        variant="outlined" // TextField 样式继承
        rules={{ required: '请输入' }} // 定义验证规则
      />
      <FormText
        name="wardBedId"
        variant="outlined"
        rules={{ required: '请输入' }}
      />
      <Button
        // 在这里提交表单 handleSubmit和react-form-hook保持一致
        // 事实上 useFormComponent完全继承了useForm的api
        onClick={handleSubmit((data) => console.log(data))}
      >
        提交
      </Button>
    </div>
  )
}
```

# 更新记录
1.新增AsyncTree组件，可以分次从后端获取tree的数据


# API 接口参数介绍

详细介绍了库提供的相关组件和 hook

## HOOK

### useFormComponent 主 hook

### withControllerFields 注入 Controller 工具

## BaseComponent 基础组件

- BaseComponent 都需要实现以下通用属性，这是表单组件需要的通用实现：

```ts
/** Form表单组件入参基本参数
 * @param TValue 组件绑定的数据类型
 */
export type IFormComponentPropsBase<TValue = any, TItem = null> = {
  /** 错误状态 */
  error?: boolean;
  /** 组件下提示文本 */
  helperText?: string | JSX.Element;
  /** 组件内提示 */
  label?: string | JSX.Element;
  /** 表单值 */
  value?: TValue;
  /** 更新值 */
  onChange?: IChange<TValue>;
  /** 用于Select同时绑定多个Form属性
   * @description 如果需要使用otherNames属性绑定多个属性, 请实现该方法
   */
  onItemChange?: IChange<TItem>;
};
```

### BaseFormSearch 搜索(可用于表单)

### BaseSelect 选择框

### MuiFormSearch 搜索(受控)

### BaseFormCheckbox 复选框

### BaseFormSwitch 开关

### Region 地区选择

## FormComponent 表单组件

- 表单组件由 **useFormComponent 方法** 方法返回；
- 表单组件继承自基础组件(**BaseComponent**)，所以拥有对应的 BaseComponent 的相关所有属性；
- 表单组件继承 react-hook-form 的**Controller**，所以拥有 Controller 组件的所有属性;

```typescript
{
    name: TName;
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    shouldUnregister?: boolean;
    defaultValue?: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
    control?: Control<TFieldValues>;
}
```

- 表单组件其他附加属性

```typescript
{
    /** 默认错误提示 */
    defaultErrorMessage?: string | JSX.Element
    /** 同时绑定多个Form属性
      * @description 如果需要使用otherNames属性绑定多个属性, 请在原始组件中实现onItemChange方法
      */
    otherNames?: {[itemProperty]:formName}
  }
```

- 表单组件内部已经托管属性: error,helperText,value,onChange,control；这些属性无须重新赋值，但开发者显示赋值将覆盖托管值

### FormText

请参考@mui/material/TextField

### FormSelect

请参考 BaseSelect

### FormSearch

请参考 MuiFormSearch

### FormCheckbox

请参考 BaseFormCheckbox

### FormSwitch

请参考 BaseFormSwitch

### FormRegion

请参考 Region

## OtherComponent 其他组件

一些基础组件

### DropDownInput 输入下拉基础组件

### MuiDataGrid DataGrid

### MuiSearch 搜索(非受控)

### Tree 树
### AsyncTree 异步树

# Develop 开发

## 准备工作
* 将 package.dev.json 内容复制到 package.json
* 这使得组件库mui-form-hook的更新会实时同步到工作空间的其他仓库，而无需build打包。
* 发布前需要将将 package.prod.json 内容复制到 package.json

## 开始

@mui-form/hook 提供了开发的方法让开发者可以进行二次开发，便于丰富 Form 的组件。

- 其他表单组件如果需集成的 useFormComponent 中，需要实现 useFormComponent 规定的参数，具体参数属性如下：

  ```ts
  /** Form表单组件入参基本参数
   * @param TValue 组件绑定的数据类型
   */
  export type IFormComponentPropsBase<TValue = any, TItem = null> = {
    /** 错误状态 */
    error?: boolean;
    /** 组件下提示文本 */
    helperText?: string | JSX.Element;
    /** 组件内提示 */
    label?: string | JSX.Element;
    /** 表单值 */
    value?: TValue;
    /** 更新值 */
    onChange?: IChange<TValue>;
    /** 用于Select同时绑定多个Form属性
     * @description 如果需要使用otherNames属性绑定多个属性, 请实现该方法
     */
    onItemChange?: IChange<TItem>;
  };
  ```

- 开发流程

1. 定义组件参数 建议用类型 *IFormComponentProps*处理组件入参，它规定了上述规范的参数，同时继承用户自定义的参数。

   ```ts
   // IFormComponentProps需要三个泛型参数
   // <TProps> 自定义组件参数
   // <TV> value的类型
   // <TI> item的类型 (下拉选择框等的单项数据类型)
   export type IMyNewComponetProps<TV = any, TI = any> = IFormComponentProps<
     MuiComponetProps,
     TV,
     TI
   >;
   ```

2. 实现组件
   ```jsx
   const MyNewComponet = ({...props}:IMyNewComponetProps)=>{
     // ... 具体的实现内容
     return (
       <MuiComponet
         {...props}
       >)
   }
   ```
3. 把组件附加到 useFormComponent 中,使用**withControllerFields**
   ```jsx
   const { formProps } = useFormComponent({
     defaultValues: getDefaultFormDat(),
   });
   const FormComponent = withControllerFields(MyNewComponet, { formProps });
   ```
