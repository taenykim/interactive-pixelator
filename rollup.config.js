import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import svgr from "@svgr/rollup";
import url from "rollup-plugin-url";
import typescript from "rollup-plugin-typescript";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "./lib/index.ts",
  plugins: [
    resolve({ extensions }),
    babel({ extensions, include: ["src/**/*"], runtimeHelpers: true }),
    commonjs({
      include: "node_modules/**",
    }),
    url(),
    svgr(),
    typescript(),
  ],
  output: [
    {
      file: pkg.module,
      format: "es",
    },
  ],
};
