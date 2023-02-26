import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import CloseIcon from '@mui/icons-material/Close'
export interface UseDialogProps {
  open: boolean // 是否打开
  handleClose: () => void // 关闭函数
  scroll?: 'body' | 'paper' // 滚动方式
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false // 最大宽度
  titleColor?: 'white' | 'green' // 标题颜色
  title?: string | React.ReactNode // 标题
  children?: React.ReactNode // 内容填充
  actionsList?: React.ReactNode[] | ButtonProps[] // 操作按钮列表
}

const UseDialog = (props: UseDialogProps) => {
  let { open, handleClose, title, titleColor = 'white', scroll, maxWidth, children, actionsList } = props

  const UseTitle = (titleProps: string | React.ReactNode) => {
    return typeof titleProps === 'string' ? (
      <>
        <div>{titleProps}</div>
        <CloseIcon onClick={handleClose} />
      </>
    ) : (
      titleProps
    )
  }

  const UseAction = (arr: React.ReactNode[] | ButtonProps[]) => {
    return arr.map((v, i) => {
      return React.isValidElement(v) ? v : <Button key={i} {...v} />
    })
  }

  return (
    <Dialog fullWidth scroll={scroll} open={open} onClose={handleClose} maxWidth={maxWidth} className="useDialog">
      {title && <div className={`useDialog-title ${titleColor}`}>{UseTitle(title)}</div>}
      <DialogContent className="useDialog-content">{children}</DialogContent>
      {actionsList?.length ? <DialogActions className="useDialog-actions">{UseAction(actionsList)}</DialogActions> : null}
    </Dialog>
  )
}
export default UseDialog
