import { useState } from 'react'
import { useSelect } from './useSelect'

export const useTree = (defaultData, { keyExpr, multiSelect = false }) => {
  const selectState = useSelect()
  const expandState = useSelect()
  const { ids: selectids } = selectState
  const { ids: expandedids } = expandState
  const [treeData, setTreeData] = useState(defaultData)
  const selectToggle = (key) => {
    if (!multiSelect) {
      if (selectState.isSelected(key)) {
        selectState.reset()
      } else {
        selectState.reset(key)
      }
    } else {
      selectState.toggle(key)
    }
  }
  
  const singleSelect = (key)=>{
    selectState.reset(key)
  }

  return {
    treeData,
    setTreeData,
    selectids,
    selectState,
    selectToggle,
    singleSelect,
    expandedids,
    expandState
  }
}
