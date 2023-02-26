/** 创建防抖函数 ：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数 */
export const createDebounce = () => {
  let timeout: any = null
  return (func: () => any, wait = 500, immediate = false) => {
    let callNow: boolean
    // 清除定时器
    if (timeout !== null) clearTimeout(timeout)
    // 立即执行，此类情况一般用不到
    if (immediate) {
      callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) typeof func === 'function' && func()
    } else {
      // 设置定时器，当最后一次操作后，this.timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
      timeout = setTimeout(() => {
        typeof func === 'function' && func()
      }, wait)
    }
  }
}