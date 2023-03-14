import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss'
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { babel } from '@rollup/plugin-babel';
import { name } from './package.json';
import externalModule from "./externalModule"
import dts from "rollup-plugin-dts";

export default defineConfig([
  {
    input: './src/index.tsx',
    external: (source, importer, isResolved) => {
      const externalList = externalModule;
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
        file: './dist/index.ejs',
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
    input: 'src/index.tsx',
    output: [
      {
        name,
        file: './dist/index.d.ts',
      }
    ],
    plugins: [dts()]
  },
])
