import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgPlugin from "./svgconfig"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgPlugin],
  base: "./",
  esbuild: {
    loader: 'tsx',
    include: [/src\/.*\.[tj]sx?$/, /src\/.*\.png?$/],
  },
  optimizeDeps: {
    include: ['/src'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    }
  },
})
