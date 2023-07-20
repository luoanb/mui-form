import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";
import { nodeResolve as resolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-node-polyfills";
import { terser } from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";

// import { name } from "./package.json";
const name = "yibao";
export default defineConfig([
  {
    input: "./src/legacy.ts",
    plugins: [
      typescript(),
      commonjs(),
      json(),
      babel({
        presets: [
          [
            "@babel/preset-env",
            // {
            //   useBuiltIns: "entry",
            //   corejs: "2.6.12",
            // },
          ],
        ],
        targets: {
          chrome: "58",
          ie: "8",
        },
      }),
    ],
    output: [
      {
        name,
        file: "./dist/index_umd.js",
        format: "umd",
      },
    ],
  },
  {
    input: "./src/legacy.ts",
    plugins: [
      typescript(),
      // nodePolyfills(),
      resolve({
        extensions: [".tsx", ".ts", ".js", "mjs", "cjs", "jsx"],
      }),
      commonjs(),
      json(),
      nodePolyfills(),
      babel({
        presets: [
          // ["env"],
          [
            "@babel/preset-env",
            {
              useBuiltIns: "entry",
              corejs: "2.6.12",
              // targets: {
              //   chrome: "58",
              //   ie: "8",
              // },
            },
          ],
        ],
        targets: {
          chrome: "58",
          ie: "8",
        },
      }),
      cleanup(),
      terser(),
    ],
    output: [
      {
        name,
        file: "./dist/index_umd_full.js",
        format: "umd",
        // minifyInternalExports
      },
    ],
  },
]);
