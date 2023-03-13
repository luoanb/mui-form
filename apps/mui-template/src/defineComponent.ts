import { forwardRef, useImperativeHandle } from "react";
/**
 * 组件返回
 */
export type RBase = {
  element: JSX.Element;
};

/**
 * 根据组件类型获取ref类型
 */
export type ComponentRef<T extends Component> = Omit<ReturnType<T>, "element">;
/**
 * 组件
 */
export type Component<P = any, R extends RBase = RBase> = (props: P) => R;

/**
 * 快速定义带外抛属性组件的高阶组件工具
 * @param {Component} component 组件
 * @returns React组件
 */
export function defineComponent<P = any, R extends RBase = RBase>(
  component: Component<P, R>
) {
  return forwardRef<Omit<R, "element">, P>((props, ref) => {
    const { element, ...attr } = component(props);
    useImperativeHandle(ref, () => attr);
    return element;
  });
}
