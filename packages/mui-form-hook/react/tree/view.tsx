import React from 'react'
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
     * @default false
     */
    hasChildren: boolean
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

/** 子节点渲染 */
const renderTree = (nodes: any[], { treeItemProps, childrenExpr, keyExpr, displayExpr }) => {
  return nodes.map?.((node: any) => {
    return (
      // key={node[keyExpr]} 设置key 和解构属性会导致异常
      <CustomTreeItem {...treeItemProps} nodeId={node[keyExpr]} label={node[displayExpr]}>
        {Array.isArray(node[childrenExpr]) ? renderTree(node[childrenExpr], { treeItemProps, childrenExpr, keyExpr, displayExpr }) : null}
      </CustomTreeItem>
    )
  })
}

const debounce = createDebounce()
/**
 * @description 异步树
 * @description 通过createChildren分次从后端获取节点数据
 */
export const AsyncTree = ({ treeItemProps, ...props }: AsyncTreeProps) => {
  const [innerExpanded, setiInnerExpanded] = React.useState<string[]>([])
  const expanded = props.expanded || innerExpanded
  const setExpanded = props.setExpanded || setiInnerExpanded

  const { getIsLoadedByKey, addLoadedKey, isLoadedList } = useIsLoaded()

  const [data, setData] = React.useState<any[]>([])
  // 初始化第一层数据
  React.useEffect(() => {
    props.createChildren?.().then((res) => setData(res))
  }, [])

  const loadNodes = React.useCallback(
    (parentId) => {
      if (!getIsLoadedByKey(parentId)) {
        addLoadedKey(parentId)
        props.createChildren?.(parentId).then((res) => {
          setData((data) => data.concat(res))
          setExpanded((ids) => [...ids, parentId])
        })
      }
    },
    [isLoadedList]
  )

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
  return (
    <div onClick={() => console.log(treeData)}>
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
        {renderTree(treeData, { treeItemProps, childrenExpr: 'children', keyExpr: props.keyExpr, displayExpr: props.displayExpr })}
      </TreeView>
    </div>
  )
}

/** 本地数据 Tree */
export const Tree = ({ treeItemProps, dataStructure = 'tree', childrenExpr = 'children', keyExpr = 'id', displayExpr = 'name', ...props }: TreeProps) => {
  const listData = React.useMemo(
    () =>
      dataStructure === 'plat'
        ? getTreeFromFlatData({
            flatData: props.listData || [],
            getKey: (item) => item[keyExpr || 'id'],
            getParentKey: (item) => item[props.parentExpr || 'parentId'],
            rootKey: props.rootValue
          })
        : props.listData,
    [dataStructure, props.listData]
  )
  return (
    <TreeView {...props} defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      {renderTree(listData || [], { treeItemProps, childrenExpr, keyExpr, displayExpr })}
    </TreeView>
  )
}
