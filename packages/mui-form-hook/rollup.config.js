import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { name } from './package.json'
import dts from 'rollup-plugin-dts'

export default defineConfig([
  {
    input: './react/index.tsx',
    external: (source, importer, isResolved) => {
      const externalList = ['react', 'react-dom', 'react-hook-form', '@mui/icons-material', '@mui/material', '@mui/x-data-grid', '@mui/lab']
      return externalList.map((name) => source.indexOf(name)).includes(0)
    },
    plugins: [
      typescript(),
      resolve({
        extensions: ['.tsx', '.ts', '.js', 'mjs', 'cjs', 'jsx']
      }),
      commonjs()
    ],
    output: [
      {
        name,
        file: './dist/index.mjs',
        format: 'es'
      },
      {
        name,
        file: './dist/index.cjs',
        format: 'commonjs'
      }
    ]
  },
  {
    input: 'react/index.tsx',

    output: [
      {
        name,
        file: './dist/index.d.ts',
        format: 'es'
      }
    ],
    plugins: [
      resolve({
        extensions: ['.tsx', '.ts', 'mts', 'mtsx']
      }),
      dts()
    ]
  }
])
