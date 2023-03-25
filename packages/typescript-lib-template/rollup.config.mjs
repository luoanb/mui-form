import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";

// import { name } from "./package.json";
const name = "yibao";
export default defineConfig([
  // 后续不需要打印了
  // {
  //   input: "./node_modules/xml-js/index.js",
  //   plugins: [
  //     resolve({
  //       extensions: [".tsx", ".ts", ".js"]
  //     }),
  //     commonjs(),
  //     esbuild({
  //       target: ["chrome58", "ie8"]
  //     })
  //   ],
  //   output: [
  //     {
  //       name: "xmlJs",
  //       file: "./dist/xmlJs.js",
  //       format: "umd"
  //     }
  //   ]
  // },
  {
    input: "./src/index.ts",
    plugins: [typescript()],
    output: [
      {
        name,
        file: "./dist/index.mjs",
        format: "es",
      },
      {
        name,
        file: "./dist/index.cjs",
        format: "commonjs",
      },
    ],
  },
  {
    input: "./src/main.ts",
    plugins: [dts()],
    output: [
      {
        name,
        file: "./dist/index.d.ts",
      },
    ],
  },
]);
