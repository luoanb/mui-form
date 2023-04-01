import React, { createContext, useContext } from 'react'
import TreeView, { TreeViewProps } from '@mui/lab/TreeView'
import { CustomTreeItem } from './item'
import { getTreeFromFlatData } from './utils/tree-data-utils'
import { TreeItemProps } from '@mui/lab/TreeItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { createDebounce } from '../mui-search/tools'
import useIsLoaded from './use-isloaded'

export type AsyncTreeProps<T = any> = TreeViewProps &
  Partial<{
    /** 异步获取子节点方法 */
    createChildren: (parent?: T) => Promise<T[]>
    /** key键
     * @default "id"
     */
    keyExpr: string
    /** 展示键
     * @default "name"
     */
    displayExpr: string
    /** 根节点Key */
    rootValue: any
    /** 父节点 */
    parentExpr: string
    /** 子节点参数 */
    treeItemProps: TreeItemProps
    /** 是否有子节点属性
     * @default "hasChildren"
     */
    hasChildrenExpr: string
    /**
     * 改变Expanded
     */
    setExpanded: any
  }>

type TreeData<T> = Array<
  T & {
    children?: Array<TreeData<T>>
  }
>

export type TreeProps<T = any> = TreeViewProps &
  Partial<{
    /** 异步获取子节点方法 */
    listData: TreeData<T>
    /** key键
     * @default "id"
     */
    keyExpr: string
    /** 展示键
     * @default "name"
     */
    displayExpr: string
    /** 根节点Key */
    rootValue: any
    /** 子节点键 用于tree型数据 */
    childrenExpr: string
    /** 子节点参数 */
    treeItemProps: Partial<TreeItemProps>
    /** 父节点 用于plat型数据 */
    parentExpr: string
    /** 数据结构 */
    dataStructure: 'tree' | 'plat'
  }>

/**
 * 将Tree参数注入
 */
export const TreeProps = createContext<TreeProps & AsyncTreeProps>({})
// export const AsyncTreeProps = createContext<AsyncTreeProps>({})

/** 子节点渲染 */
const RenderTree = ({ nodes }: { nodes: any[] }) => {
  const { treeItemProps, childrenExpr, keyExpr, displayExpr } = useContext(TreeProps)
  return (
    <>
      {nodes.map?.((node: any) => {
        return (
          // key={node[keyExpr]} 设置key 和解构属性会导致异常

          <CustomTreeItem {...treeItemProps} itemData={node} nodeId={node[keyExpr]} label={node[displayExpr]}>
            {Array.isArray(node[childrenExpr]) ? <RenderTree nodes={node[childrenExpr]} /> : null}
          </CustomTreeItem>
        )
      })}
    </>
  )
}

const debounce = createDebounce()
/**
 * @description 异步树
 * @description 通过createChildren分次从后端获取节点数据
 */

/**
 * @description 异步树
 * @description 通过createChildren分次从后端获取节点数据
 * @date 2023/4/1 - 17:23:26
 * @param {AsyncTreeProps} props
 * @returns {*}
 */
export const AsyncTree = (props: AsyncTreeProps) => {
  const [innerExpanded, setiInnerExpanded] = React.useState<string[]>([])
  const expanded = props.expanded || innerExpanded
  const setExpanded = props.setExpanded || setiInnerExpanded

  const { getIsLoadedByKey, addLoadedKey, isLoadedList } = useIsLoaded()

  const [data, setData] = React.useState<any[]>([])

  // plat 转 tree
  const treeData = React.useMemo(
    () =>
      getTreeFromFlatData({
        flatData: data || [],
        getKey: (item) => item[props.keyExpr || 'id'],
        getParentKey: (item) => item[props.parentExpr || 'parentId'],
        rootKey: props.rootValue
      }),
    [data]
  )
  // 初始化第一层数据
  React.useEffect(() => {
    props.createChildren?.().then((res) => setData(res))
  }, [])

  const loadNodes = React.useCallback(
    (parentId) => {
      const parentItem = data.find((item) => item[props.keyExpr] == parentId)
      // 判断节点是否有子节点
      if (!parentItem?.[props.hasChildrenExpr || 'hasChildren']) {
        return
      }
      if (!getIsLoadedByKey(parentId)) {
        addLoadedKey(parentId)
        props.createChildren?.(parentId).then((res) => {
          setData((data) => data.concat(res))
          setExpanded((ids) => [...ids, parentId])
        })
      }
    },
    [isLoadedList, data]
  )

  return (
    <div>
      <TreeView
        {...props}
        expanded={expanded}
        onNodeToggle={(e, ids) => {
          props.onNodeToggle?.(e, ids)
          setExpanded(ids)
        }}
        onNodeFocus={(e, id) => {
          props.onNodeFocus?.(e, id)
          debounce(() => loadNodes(id), 100)
        }}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeProps.Provider value={{ childrenExpr: 'children', ...props }}>
          <RenderTree nodes={treeData || []} />
        </TreeProps.Provider>
      </TreeView>
    </div>
  )
}


/**
 * Tree 
 * @date 2023/4/1 - 17:24:17
 *
 * @param {TreeProps} { listData: outListData = [], ...statusProps }
 * @returns {*}
 */
export const Tree = ({ listData: outListData = [], ...statusProps }: TreeProps) => {
  const { treeItemProps, dataStructure = 'tree', childrenExpr = 'children', keyExpr = 'id', displayExpr = 'name', ...props } = statusProps
  const listData = React.useMemo(
    () =>
      dataStructure === 'plat'
        ? getTreeFromFlatData({
            flatData: outListData || [],
            getKey: (item) => item[keyExpr || 'id'],
            getParentKey: (item) => item[props.parentExpr || 'parentId'],
            rootKey: props.rootValue
          })
        : outListData,
    [dataStructure, outListData]
  )
  return (
    <TreeView {...props} defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      <TreeProps.Provider value={statusProps as any}>
        <RenderTree nodes={listData || []} />
      </TreeProps.Provider>
    </TreeView>
  )
}
