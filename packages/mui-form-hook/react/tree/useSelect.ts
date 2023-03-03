import React, { useState } from 'react'
type Key = string | number

export const useSelect = () => {
  const [selectids, setSelectids] = useState<{ [propName: Key]: boolean }>({})
  const select = (...keys: Key[]) => {
    let newSelectids = {}
    keys.forEach((key) => (newSelectids[key] = true))
    setSelectids((ids) => ({ ...ids, ...newSelectids }))
  }
  const deselect = (...keys: Key[]) => {
    let newSelectids = {}
    keys.forEach((key) => (newSelectids[key] = false))
    setSelectids((ids) => ({ ...ids, ...newSelectids }))
  }

  const toggle = (key:Key) => {
    setSelectids((ids) => ({ ...ids, [key]: !ids[key] }))
  }

  const isSelected = (key: Key) => !!selectids[key]

  const reset = (...keys: Key[]) => {
    let newSelectids = {}
    keys.forEach((key) => (newSelectids[key] = true))
    setSelectids({ ...newSelectids })
  }
  // 计算属性
  const ids = Object.keys(selectids).filter((key) => selectids[key])
  return {
    /**
     * 选中数组
     */
    ids,
    /**
     * 批量选中
     */
    select,
    /**
     * 批量取消选中
     */
    deselect,
    /**
     * 切换选中状态
     * @param key
     */
    toggle,
    /**
     * 重置
     */
    reset,
    /**
     * 判断是否被选中
     * @param key
     * @returns
     */
    isSelected
  }
}
