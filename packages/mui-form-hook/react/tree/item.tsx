import clsx from 'clsx'
import React, { useContext } from 'react'
import TreeItem, { TreeItemProps, useTreeItem, TreeItemContentProps } from '@mui/lab/TreeItem'
import { Typography } from '@mui/material'
import { TreeProps } from './view'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface CustomTreeItemProps extends TreeItemProps {
  itemData: any
}

interface CustomContentProps extends TreeItemContentProps {
  treeItemProps: CustomTreeItemProps
}

export const CustomContent = function CustomContent(props: CustomContentProps, ref) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    treeItemProps: { itemData }
  } = props

  const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } = useTreeItem(nodeId)
  const { hasChildrenExpr = 'hasChildren' } = useContext(TreeProps)
  const hasChildren = itemData[hasChildrenExpr]
  const icon = hasChildren ? <ChevronRightIcon /> : iconProp || expansionIcon || displayIcon

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled
      })}
      onMouseDown={preventSelection}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      <div onClick={handleExpansion} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography onClick={handleSelection} component="div" className={classes.label}>
        {label}
      </Typography>
    </div>
  )
}

export const CustomTreeItem = (props: CustomTreeItemProps) => (
  <TreeItem {...props} ContentComponent={React.forwardRef((contensProps, ref) => CustomContent({ ...contensProps, treeItemProps: props }, ref))} />
)
