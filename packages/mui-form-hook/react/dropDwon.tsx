import { useState } from 'react'
import { Popover, PopoverProps } from '@mui/material'
import React from 'react'

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
