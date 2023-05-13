import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgPlugin from "./svgconfig";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgPlugin],
  base: "./",
  server: {
    port: 80,
  },
  build: {
    commonjsOptions: {
      include: [
        /node_modules/,
        /mui-form-hook/,
        /ref-component/,
        /mui-form-hook/,
      ],
      defaultIsModuleExports: "auto",
    },
  },
  esbuild: {
    loader: "tsx",
    include: [/src\/.*\.[tj]sx?$/, /src\/.*\.png?$/],
  },
  optimizeDeps: {
    include: [
      "mui-layout-component",
      "ref-component",
      "mui-form-hook",
      // "react",
    ],
    // include: ['/src'],
    // esbuildOptions: {
    //   loader: {
    //     '.js': 'jsx',
    //   },
    // }
  },
});
