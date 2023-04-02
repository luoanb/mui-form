import * as fs from "fs"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'tsx',
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
  }
})
