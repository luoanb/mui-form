import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import { name } from './package.json'

export default defineConfig([
  {
    input: './react/index.tsx',
    external: (source, importer, isResolved) => {
      const externalList = ['react', 'react-dom']
      return externalList.map((name) => source.indexOf(name)).includes(0)
    },
    plugins: [
      typescript(),
      resolve({
        extensions: ['.tsx', '.ts', '.js', 'mjs', 'cjs', 'jsx']
      }),
      commonjs(),
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
              useESModules: false
            }
          ]
        ]
      })
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
      }
    ]
  },
  {
    input: './react/index.tsx',
    external: (source, importer, isResolved) => {
      const externalList = ['react', 'react-dom']
      return externalList.map((name) => source.indexOf(name)).includes(0)
    },
    plugins: [
      typescript(),
      resolve({
        extensions: ['.tsx', '.ts', '.js', 'mjs', 'cjs', 'jsx']
      }),
      commonjs(),
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
              useESModules: false
            }
          ]
        ]
      }),
      cleanup(),
      terser()
    ],
    output: [
      {
        name,
        file: './dist/index.umd.min.js',
        format: 'umd',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    ]
  }
])
