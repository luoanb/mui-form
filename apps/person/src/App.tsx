import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Box, Button } from '@mui/material'
// @ts-ignore
import { docPrintForRender } from './docPrintInstance.es.js'

const A4 = ({ children }: PropsWithChildren) => (
  <Box
    sx={(t) => ({
      width: '210mm',
      height: '297mm'
    })}
  >
    {children}
  </Box>
)

function App() {
  const contref = useRef<HTMLDivElement>(null)
  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={() => docPrintForRender.printWithStyle(contref.current?.innerHTML)}>
        打印
      </Button>
      <Box
        ref={contref}
        sx={(t) => ({
          '>*': {
            boxShadow: t.shadows[6],
            mb: t.spacing(1)
          }
        })}
      >
        <A4>哈哈</A4>
        <A4>哈哈</A4>
        <A4>哈哈</A4>
      </Box>
    </Box>
  )
}

export default App
