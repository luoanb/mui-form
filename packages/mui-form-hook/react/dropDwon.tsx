import React,{ useState } from 'react'
import { Popover, PopoverProps } from '@mui/material'

interface E {
  currentTarget: HTMLElement
}

interface TargetProps {
  open: boolean
  handleOpen: (e: E) => void
  handleClose: () => void
}

export interface DropDownProps {
  target: (props: TargetProps) => JSX.Element
  downContent: (props: TargetProps) => JSX.Element
  downPageProps?: Partial<PopoverProps>
}

const defaultanchorOrigin: any = { vertical: 'bottom', horizontal: 'right' }
const defaulttransformOrigin: any = { vertical: 'top', horizontal: 'right' }
const defaultPaperProps: any = {
  sx: {
    p: 0,
    mt: 1.5,
    ml: 0.75,
    width: 180,
    '& .MuiMenuItem-root': {
      typography: 'body2',
      borderRadius: 0.75
    }
  }
}


/**
 * DropDown 当DropDown触发指定事件时, 展开或关闭Popover
 * @date 2023/4/1 - 17:25:51
 *
 * @export
 * @param {DropDownProps} {
  target: Target,
  downContent: DownContent,
  downPageProps: { anchorOrigin = defaultanchorOrigin, transformOrigin = defaulttransformOrigin, PaperProps = defaultPaperProps, ...downPageProps } = {}
}
 * @returns {*}
 */
export function DropDown({
  target: Target,
  downContent: DownContent,
  downPageProps: { anchorOrigin = defaultanchorOrigin, transformOrigin = defaulttransformOrigin, PaperProps = defaultPaperProps, ...downPageProps } = {}
}: DropDownProps) {
  const [open, setOpen] = useState<HTMLElement | null>(null)

  const handleOpen = ({ currentTarget }: { currentTarget: HTMLElement }) => {
    setOpen(currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  return (
    <>
      <Target open={Boolean(open)} handleClose={handleClose} handleOpen={handleOpen} />
      <Popover
        {...downPageProps}
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        PaperProps={PaperProps}
      >
        <DownContent open={Boolean(open)} handleClose={handleClose} handleOpen={handleOpen} />
      </Popover>
    </>
  )
}
