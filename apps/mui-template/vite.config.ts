import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgPlugin from "./svgconfig"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgPlugin],
  esbuild: {
    loader: 'jsx',
    // jsxInject: `import React from 'react'`,
    // include: /src\/.*\.jsx?$/,
    include: /src\/.*\.[tj]sx?$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
      // plugins: [
      //   {
      //     name: 'load-js-files-as-jsx',
      //     setup(build) {
      //       build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
      //         loader: 'jsx',
      //         contents: await fs.readFile(args.path, 'utf8')
      //       }))
      //     }
      //   }
      // ]
    }
  },
  resolve: {
    alias: {
      // '@mui/core/*': path.resolve(__dirname, 'node_modules/@mui/core/*'),
      // '@mui/material/*': path.resolve(__dirname, 'node_modules/@mui/material/*'),
      // '@mui/material': path.resolve(__dirname, 'node_modules/@mui/material'),
      // '@mui/icons-material/*': path.resolve(__dirname, 'node_modules/@mui/icons-material/*'),
      // '@mui/icons-material': path.resolve(__dirname, 'node_modules/@mui/icons-material'),
      // '@mui/lab': path.resolve(__dirname, 'node_modules/@mui/lab'),
      // '@mui/lab/*': path.resolve(__dirname, 'node_modules/@mui/lab/*'),
      // '@mui/x-data-grid': path.resolve(__dirname, 'node_modules/@mui/x-data-grid'),
      // '@mui/x-data-grid/*': path.resolve(__dirname, 'node_modules/@mui/x-data-grid/*'),
      // '@mui/core': "@mui/core",
      // '@mui/material': "@mui/material",
      // '@mui/icons-material': "@mui/icons-material",
      // '@mui/lab': "@mui/lab",
      // '@mui/x-data-grid': "@mui/x-data-grid",
    },
  },
})
