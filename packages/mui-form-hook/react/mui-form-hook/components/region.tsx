import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'
import { BaseSelect, BaseSelectProps, IFormComponentProps } from '..'

/** 地区数据单项内容 */
export type RegionItem = any

/** 地区选择数据类型 */
export type RegionValue = Partial<{
  province: RegionItem
  city: RegionItem
  area: RegionItem
  street: RegionItem
  postalCode: RegionItem
}>

const defaultSelectProps = {
  style: {
    width: 120,
    marginRight: 2
  }
}
export type RegionProps = IFormComponentProps<
  {
    /** 控制省输入框样式 */
    provinceTextProps?: BaseSelectProps
    /** 控制市输入框样式 */
    cityTextProps?: BaseSelectProps
    /** 控制区输入框样式 */
    areaTextProps?: BaseSelectProps
    /** 控制街道输入框样式 */
    streetTextProps?: TextFieldProps
    /** 控制邮编输入框样式 */
    postalCodeTextProps?: TextFieldProps
    /** 获取地区数据方法 获取省级不传parent */
    getRegionData?: (parent?: RegionItem) => Promise<RegionItem[]>
    /** code属性
     * @default RegionCode
     */
    keyExpr?: string
    /** 展示键
     * @default RegionName
     */
    displayExpr?: string
    /** 是否启用街道输入框
     * @default true
     */
    enableStreet?: boolean
    /** 是否启用邮编输入框
     * @default true
     */
    enablePostalCode?: boolean
    /** 启用非受控组件
     * @description 当为true时候，不使用外部传入状态（value，onChange）
     * @default false
     */
    isUseInputValue?: boolean
    /** 数据类型
     * @default key 默认取Item的keyExpr
     */
    dataType?: 'key' | 'item'
  },
  RegionValue,
  RegionValue
>

/** 获取默认值 */
const getDefaultRegionValue = () =>
  ({
    province: null,
    city: null,
    area: null,
    street: '',
    postalCode: ''
  } as RegionValue)

/** 地区选择
 * @param props RegionProps
 */
export const Region = ({
  // value,
  // onChange,
  isUseInputValue = false,
  enableStreet = true,
  enablePostalCode = true,
  error,
  helperText,
  getRegionData,
  keyExpr = 'RegionCode',
  displayExpr = 'RegionName',
  dataType = 'key',
  ...props
}: RegionProps) => {
  // 选中值的内部状态 当isUseInputValue为true时 内部管理状态 用onItemChange对外抛值
  const [innerValue, setInnerValue] = React.useState(getDefaultRegionValue())
  const value = isUseInputValue ? innerValue : props.value
  const onChange = isUseInputValue ? setInnerValue : props.onChange

  const setValue = (newValue: any) => {
    onChange?.(newValue)
    props.onChange?.(newValue) // 还是要外抛
  }

  /** 获取地区数据
   * @description 根据dataType类型取值
   */
  const getValueItem = (area:any) => {
    return dataType === 'item' ? area : area[keyExpr]
  }

  /** 设置省 */
  const setProvince = (province: RegionItem) => {
    setValue({
      ...getDefaultRegionValue(),
      province: getValueItem(province)
    })
    props.onItemChange?.({
      ...getDefaultRegionValue(),
      province
    })
  }

  /** 设置市 */
  const setCity = (city: RegionItem) => {
    setValue({
      ...value,
      city: getValueItem(city),

      area: null
    })
    props.onItemChange?.({
      ...value,
      city,
      area: null
    })
  }

  /** 设置区 */
  const setArea = (area: RegionItem) => {
    setValue({
      ...value,
      area: getValueItem(area)
    })
    props.onItemChange?.({
      ...value,
      area
    })
  }

  /** 设置街道 */
  const setStreet = (street: string) => {
    setValue({
      ...value,
      street
    })
  }

  /** 设置邮编 */
  const setPostalCode = (postalCode: string) => {
    setValue({
      ...value,
      postalCode
    })
  }

  // 存储当前已经获取下拉数据列表的地区code
  const [isLoadRegion, setIsLoadRegion] = React.useState(getDefaultRegionValue())
  const setIsloadRegionByKey = (key: keyof RegionValue, data: any) => {
    setIsLoadRegion((oldValue) => ({ ...oldValue, [key]: data }))
  }

  // 下拉数据
  const [provinceList, setProvinceList] = React.useState<RegionItem[]>([])
  const [cityList, setCityList] = React.useState<RegionItem[]>([])
  const [areaList, setAreaList] = React.useState<RegionItem[]>([])

  /** 获取地区的code */
  const getValueKey = (area:any) => {
    return dataType === 'item' ? area?.[keyExpr] || '' : area || ''
  }

  // value数据 具体到code 但是提交给桌面的数据是整个item
  const province = getValueKey(value?.province)
  const city = getValueKey(value?.city)
  const area = getValueKey(value?.area)
  const street = value?.street || ''
  const postalCode = value?.postalCode || ''

  // 初始化
  React.useEffect(() => {
    // value值优先于默认值
    onChange?.({ ...getDefaultRegionValue(), ...(value || {}) })
    getRegionData?.().then((data) => setProvinceList(data))
  }, [])

  // 监听value值更新 刷新下拉列表
  React.useEffect(() => {
    if (province && province !== isLoadRegion.province) {
      setCityList([])
      getRegionData?.(value?.province).then((data) => {
        setCityList(data)
        setIsloadRegionByKey('province', province)
      })
    }
    if (city && city !== isLoadRegion.city) {
      setAreaList([])
      getRegionData?.(value?.city).then((data) => {
        setAreaList(data)
        setIsloadRegionByKey('city', city)
      })
    }
  }, [value])
  return (
    <>
      {/* 错误信息放在省输入框展示 */}
      <BaseSelect
        {...defaultSelectProps}
        {...props.provinceTextProps}
        placeholder={props.provinceTextProps?.placeholder || '请选择省'}
        error={error}
        helperText={helperText}
        value={province}
        onItemChange={setProvince}
        data={provinceList}
        keyExpr={keyExpr}
        displayExpr={displayExpr}
      />
      <BaseSelect
        {...defaultSelectProps}
        {...props.cityTextProps}
        placeholder={props.cityTextProps?.placeholder || '请选择市'}
        data={cityList}
        value={city}
        onItemChange={setCity}
        keyExpr={keyExpr}
        displayExpr={displayExpr}
      />
      <BaseSelect
        {...defaultSelectProps}
        {...props.areaTextProps}
        placeholder={props.areaTextProps?.placeholder || '请选择区'}
        data={areaList}
        value={area}
        onItemChange={setArea}
        keyExpr={keyExpr}
        displayExpr={displayExpr}
      />
      {enableStreet ? (
        <TextField
          {...props.streetTextProps}
          placeholder={props.streetTextProps?.placeholder || '请填写街道等详细地址'}
          value={street}
          onChange={(v) => setStreet(v.target.value)}
        />
      ) : null}
      {enableStreet ? (
        <TextField
          {...props.postalCodeTextProps}
          placeholder={props.postalCodeTextProps?.placeholder || '请填写邮编'}
          value={postalCode}
          onChange={(v) => setPostalCode(v.target.value)}
        />
      ) : null}
    </>
  )
}
