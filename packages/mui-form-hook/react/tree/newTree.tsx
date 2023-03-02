import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { cloneElement } from 'react'

type ItemRender = (item: IStack, itemOptions: any) => JSX.Element

export interface TreeProps {
  listData: any[]
  itemRender?: ItemRender
}

export interface IStack {
  node: any
  level: number
  index?: number
  parent?: HTMLDivElement
  jsx?: JSX.Element
}

/**
 * 复制parent节点,并把newChild追加到复制节点的孩子节点里,不会改变原始节点
 * @param parent 
 * @param newChild 
 * @returns 
 */
export function jsxAppend(parent: JSX.Element, newChild: JSX.Element): JSX.Element {
  return cloneElement(parent, {}, ...React.Children.toArray(parent.props.children), newChild)
}

/**
 *  于parent节点出把child追加进入去
 * @param parent 
 * @param child 
 * @returns 
 */
export const docAppendJSX = (parent: HTMLDivElement, child: React.ReactNode) => {
  const cc = document.createElement('div')
  parent.append(cc)
  ReactDOM.createRoot(cc).render(child)
  return cc
}

// function JSXUtils() {
//   const docAppendJSX = (parent: HTMLDivElement, child: React.ReactNode) => {
//     const cc = document.createElement('div')
//     parent.append(cc)
//     ReactDOM.createRoot(cc).render(child)
//     return cc
//   }
//   const oplist: { parent: HTMLDivElement; child: React.ReactNode }[] = []
//   const addop = (parent: HTMLDivElement, child: React.ReactNode) => {
//     oplist.push({ parent, child })
//   }
//   const doop = () => {
//     oplist.forEach((item) => docAppendJSX(item.parent, item.child))
//   }
//   return {
//     docAppendJSX,
//     oplist,
//     addop,
//     doop
//   }
// }

function renderTree(listData: any[], itemRender: ItemRender, itemOptions: any) {
  const root = document.createElement('div')
  // const jsxUtils = JSXUtils()
  let stack: IStack[] = []
  let node: any | undefined
  let level = 0
  let index = 0

  listData.forEach((node) => {
    stack.push({ node: node, level, index: index++ })
  })

  while (stack.length > 0) {
    // 消费
    const item = stack.pop()

    node = item?.node
    level = item?.level || 0
    const childContainer = document.createElement('div')
    if (!itemOptions.expandedids.includes(item.node.value)) {
      childContainer.style.display = 'none'
    } else {
      childContainer.style.display = 'block'
    }

    const itemNode = itemRender(item, itemOptions)
    const nodeElement = cloneElement(itemNode, {
      ref: (ref) => {
        if (ref) {
          ref.appendChild(childContainer)
          itemNode['ref']?.(ref)
        }
      }
    })
    item.jsx = nodeElement

    if (!item.parent) {
      docAppendJSX(root, item.jsx)
    } else {
      docAppendJSX(item.parent, item.jsx)
    }

    if (node.children) {
      level++
      for (let i = node.children.length - 1; i >= 0; i--) {
        // 同时保持位置信息
        stack.push({ node: node.children[i], level, parent: childContainer })
      }
    }
  }
  return (
    <div
      ref={(ref) => {
        if (ref) {
          ref.childNodes.forEach((item) => item.remove())
          ref.appendChild(root)
        }
      }}
    ></div>
  )
}

export default function Tree({
  listData,
  itemRender = (item, options) => {
    return (
      <div
        onClick={() => {
          options.setExpandedids((ids) => [...ids, item.node.value])
          options.setSelectids((ids) => [...ids, item.node.value])
        }}
        key={item.node.value + 'cc'}
        style={{ marginLeft: '16px' }}
      >
        <span style={{ background: options.selectids.includes(item.node.value) ? '#efefef' : '#fff' }}>{item.node.value}</span>
      </div>
    )
  },
  ...props
}: TreeProps) {
  const [selectids, setSelectids] = useState([])
  const [expandedids, setExpandedids] = useState([])
  return (
    <>
      <div>expandedids:{expandedids}</div>
      {renderTree(listData, itemRender, {
        selectids,
        setSelectids,
        expandedids,
        setExpandedids,
        ...props
      })}
    </>
  )
}
