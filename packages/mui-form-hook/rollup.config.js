import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss'
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { babel } from '@rollup/plugin-babel';
import { name } from './package.json';
import dts from "rollup-plugin-dts";

export default defineConfig([
  {
    input: './react/index.tsx',
    external: (source, importer, isResolved) => {
      const externalList = ['react', 'react-dom', "react-hook-form", "@mui/icons-material", "@mui/material", "@mui/x-data-grid", "@mui/lab"]
      return externalList.map(name => source.indexOf(name)).includes(0)
    },
    plugins: [
      typescript(),
      resolve({
        extensions: ['.tsx', '.ts', '.js']
      }),
      postcss({}),
      babel({
        babelrc: false,
        exclude: '**/node_modules/**',
        presets: ['@babel/preset-react', '@babel/preset-env'],
        plugins: [
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-syntax-object-rest-spread',
          '@babel/plugin-transform-react-jsx',
          [
            '@babel/plugin-transform-runtime',
            {
              absoluteRuntime: false,
              corejs: false,
              helpers: false,
              regenerator: false,
              useESModules: false,
            },
          ],
        ],
      }),
      commonjs(),
    ],
    output: [
      {
        name,
        file: './dist/index.umd.js',
        format: 'umd',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
      {
        name,
        file: './dist/index.mjs',
        format: 'es',
      },
      {
        name,
        file: './dist/index.cjs',
        format: 'commonjs',
      }
    ]
  },
  {
    input: 'react/index.tsx',
    output: [
      {
        name,
        file: './dist/react/index.d.ts',
        format: 'umd',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
      {
        name,
        file: './es/react/index.d.ts',
        format: 'es',
      },
      {
        name,
        file: './lib/react/index.d.ts',
        format: 'commonjs',
      }
    ],
    plugins: [dts()]
  },
])
