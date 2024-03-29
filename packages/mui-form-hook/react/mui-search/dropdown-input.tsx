import React, { useState } from 'react'
import { Box } from '@mui/material'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Fade from '@mui/material/Fade'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Popper, { PopperPlacementType } from '@mui/material/Popper'


/**
 * DowndownRanderProps
 * @date 2023/4/1 - 17:19:03
 *
 * @export
 * @typedef {DowndownRanderProps}
 */
export type DowndownRanderProps = {
  /** 关闭函数 */
  close: () => void
  /** 展开状态 */
  open: boolean
}

/** 组件入参
 * @extends TextFieldProps TextField入参
 * @param DowndownRander 自定义下拉框组件
 */
export type DropDownInputProps = TextFieldProps & {
  /** 自定义下拉框组件 */
  downRander: ({ close }: DowndownRanderProps) => JSX.Element
  /** 下拉框位置
   * @default "bottom"
   */
  placement?: PopperPlacementType
  /** zIndex
   * @default 999
   */
  zIndex?: number
}

const ClickAwayListenerBase: any = ClickAwayListener


/**
 * 输入框下拉弹框
 * @date 2023/4/1 - 17:19:37
 *
 * @param {DropDownInputProps} { downRander, onFocus, placement, style = {}, zIndex = 999, ...props }
 * @returns {*}
 */
export const DropDownInput = ({ downRander, onFocus, placement, style = {}, zIndex = 999, ...props }: DropDownInputProps) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & (HTMLInputElement | HTMLTextAreaElement)) | null>(null)
  const open = !!anchorEl
  const close = () => {
    setAnchorEl(null)
  }
  // todo const key = props.key 为什么 runtime-dom.d @type/react key属性冲突
  return (
    <ClickAwayListenerBase onClickAway={close}>
      <div style={{ display: 'inline-flex', ...style }}>
        <TextField
          {...props}
          style={style}
          autoComplete="off"
          onFocus={(e) => {
            setAnchorEl(e.currentTarget)
            onFocus?.(e)
          }}
        />
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition style={{ backgroundColor: '#fff', zIndex }}>
          {({ TransitionProps }: any) => (
            <Fade {...TransitionProps} timeout={350}>
              {/* 处理延时问题 */}
              <Box style={{ display: open ? undefined : 'none' }}>{downRander({ close, open })}</Box>
            </Fade>
          )}
        </Popper>
      </div>
    </ClickAwayListenerBase>
  )
}
