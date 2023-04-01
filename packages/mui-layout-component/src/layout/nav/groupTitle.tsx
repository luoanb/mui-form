import React from 'react'
import Typography from '@mui/material/Typography'


/**
 * 分组标题
 * @date 2023/4/1 - 17:32:10
 *
 * @export
 * @param {{ title: string }} { title }
 * @returns {*}
 */
export function GroupTitle({ title }: { title: string }) {
  return (
    <Typography variant="body1" color="inherit" sx={(theme) => ({ margin: `${theme.spacing(1)} ${theme.spacing(3)}` })} component="div">
      {title}
    </Typography>
  )
}
