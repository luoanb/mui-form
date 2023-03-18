import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TreeView, { TreeViewProps } from '@mui/lab/TreeView'
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem'
import Typography from '@mui/material/Typography'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string
  color?: string
  labelIcon?: React.ReactNode
  labelInfo?: string
  labelText: string
  [prop: string]: any
}

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    position: 'absolute',
    right: 0
  },
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    position: 'relative',
    height: theme.spacing(5),
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2.5),
    borderBottomRightRadius: theme.spacing(2.5),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)'
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit'
    }
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2)
    }
  }
}))

export interface MuiTreeProps {
  treeItemProps?: Partial<TreeItemProps>
  treeViewProps?: TreeViewProps
  data: any[]
  childrenExpr?: string
  keyExpr?: string
  iconExpr?: string
  displayExpr?: string
  TreeItem?: (
    props: Omit<MuiTreeProps, 'data' | 'treeViewProps' | 'TreeItem'> & {
      itemData: any
    } & Partial<TreeItemProps>
  ) => JSX.Element
  customLabelText?: (
    props: Omit<MuiTreeProps, 'data' | 'treeViewProps' | 'TreeItem' | 'customLabelText'> & {
      itemData: any
    }
  ) => JSX.Element
}

type RenderTreeProps = Omit<MuiTreeProps, 'treeViewProps' | 'children'>

/** 子节点渲染 */
const renderTree = ({ data: nodes, TreeItem, childrenExpr = 'children', ...treeProps }: RenderTreeProps) => {
  !TreeItem &&
    (TreeItem = ({ itemData, keyExpr = 'id', customLabelText, treeItemProps, children, ...itemprops }) => {
      !customLabelText &&
        (customLabelText = ({ itemData, displayExpr = 'name', iconExpr = 'icon' }) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
              <Box color="inherit" sx={{ mr: 1 }}>
                {itemData[iconExpr]}
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                {itemData[displayExpr]}
              </Typography>
            </Box>
          )
        })
      const label = customLabelText({ itemData, ...itemprops })
      return (
        <StyledTreeItemRoot {...treeItemProps} nodeId={itemData[keyExpr]} label={label}>
          {children}
        </StyledTreeItemRoot>
      )
    })
  return (
    <>
      {nodes.map?.((node: any) => {
        return (
          // key={node[keyExpr]} 设置key 和解构属性会导致异常
          <TreeItem {...treeProps} itemData={node} key={node[treeProps.keyExpr || 'id']}>
            {Array.isArray(node[childrenExpr]) ? renderTree({ data: node[childrenExpr], TreeItem, ...treeProps }) : null}
          </TreeItem>
        )
      })}
    </>
  )
}

export function MuiTree({
  treeViewProps: {
    defaultCollapseIcon = <ArrowDropDownIcon />,
    defaultExpandIcon = <ArrowRightIcon />,
    defaultEndIcon = <Box style={{ width: 24 }} />,
    sx = { flexGrow: 1, maxWidth: 400, overflowY: 'auto' },
    ...treeViewProps
  } = {},
  ...MuiTreeProps
}: MuiTreeProps) {
  return (
    <TreeView {...treeViewProps} defaultCollapseIcon={defaultCollapseIcon} defaultExpandIcon={defaultExpandIcon} defaultEndIcon={defaultEndIcon} sx={sx}>
      {renderTree(MuiTreeProps)}
    </TreeView>
  )
}
