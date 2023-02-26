import React from "react"

/*
 * @Author: LAB
 * @Date: 2022-01-17 12:58:35
 * @Description: 
 */
const useIsLoaded = () => {
  const [isLoadedList, setIsLoadedList] = React.useState<any>({})
  /** 重置 */
  const reset = () => {
    setIsLoadedList({})
  }
  /** 添加已经加载数据的key */
  const addLoadedKey = (key) => {
    setIsLoadedList((data) => ({ ...data, [key]: true }))
  }
  /** 获取数据加载状态 */
  const getIsLoadedByKey = (key) => {
    return !!isLoadedList[key]
  }
  return {
    /** 已经获取数据的key */
    isLoadedList,
    /** 赋值 */
    setIsLoadedList,
    /** 重置 */
    reset,
    /** 添加已经加载数据的key */
    addLoadedKey,
    /** 获取数据加载状态 */
    getIsLoadedByKey
  }
}
export default useIsLoaded