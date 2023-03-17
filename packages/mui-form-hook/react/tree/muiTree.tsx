import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TreeView from '@mui/lab/TreeView'
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem'
import Typography from '@mui/material/Typography'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string
    '--tree-view-bg-color'?: string
  }
}

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

function StyledTreeItem(props: StyledTreeItemProps) {
  const { bgColor, color, labelIcon: LabelIcon, labelInfo, labelText, treeProps, itemData, ...other } = props
  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box color="inherit" sx={{ mr: 1 }}>
            {LabelIcon}
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      sx={(t) => ({
        '--tree-view-color': color || '#fff',
        '--tree-view-bg-color': bgColor || t.palette.primary.light
      })}
      {...other}
    />
  )
}

/** 子节点渲染 */
const renderTree = ({ nodes, treeProps }: { nodes: any[]; treeProps: Partial<MuiTreeProps> }) => {
  const { childrenExpr = 'children', keyExpr = 'id', iconExpr = 'icon', displayExpr = 'name', TreeItem = StyledTreeItem } = treeProps
  return (
    <>
      {nodes.map?.((node: any) => {
        return (
          // key={node[keyExpr]} 设置key 和解构属性会导致异常
          <TreeItem labelIcon={node[iconExpr]} nodeId={node[keyExpr]} labelText={node[displayExpr]} itemData={node} treeProps={treeProps}>
            {Array.isArray(node[childrenExpr]) ? renderTree({ nodes: node[childrenExpr], treeProps }) : null}
          </TreeItem>
        )
      })}
    </>
  )
}

export interface MuiTreeProps {
  data: any[]
  childrenExpr?: string
  keyExpr?: string
  iconExpr?: string
  displayExpr?: string
  TreeItem?: () => JSX.Element
}

export function MuiTree({ data, ...treeProps }: MuiTreeProps) {
  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {renderTree({ nodes: data, treeProps })}
    </TreeView>
  )
}
