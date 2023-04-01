import { forwardRef, useImperativeHandle, ComponentRef } from 'react'
/**
 * 组件返回值
 */
type RBase = {
  element: JSX.Element
}

/**
 * 根据组件返回组件ref
 */
export type { ComponentRef }


/**
 * Ref Component
 * @date 2023/4/1 - 16:45:17
 *
 * @export
 * @typedef {Component}
 * @template P
 * @template R
 */
export type Component<P = any, R extends RBase = RBase> = (props: P) => R


/**
 * 快速定义带外抛属性组件的高阶组件工具
 * @date 2023/4/1 - 16:44:32
 *
 * @export
 * @template P
 * @template R
 * @param {Component<P, R>} component
 * @returns {*} React组件
 */
export function defineComponent<P = any, R extends RBase = RBase>(component: Component<P, R>) {
  return forwardRef<Omit<R, 'element'>, P>((props, ref) => {
    const { element, ...attr } = component(props)
    useImperativeHandle(ref, () => attr)
    return element
  })
}
