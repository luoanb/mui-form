import React from "react"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export const defaultItemRender = (item, options) => {
  // 控制折叠展开
  const childContainer = options.childContainer
  if (!options.treeState.expandState.isSelected(item.node.value)) {
    childContainer.style.display = 'none'
  } else {
    childContainer.style.display = 'block'
  }
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        options.treeState.expandState.toggle(item.node.value)
        options.treeState.singleSelect(item.node.value)
      }}
      key={item.node.value}
      style={{ marginLeft: '16px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', background: options.treeState.selectState.isSelected(item.node.value) ? '#efefef' : '#fff' }}>
        <div style={{ width: '24px' }}>
          {item.node.children ? options.treeState.expandState.isSelected(item.node.value) ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon /> : null}
        </div>
        <span>{item.node.value}</span>
      </div>
    </div>
  )
}
