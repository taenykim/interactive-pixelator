import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript";

const extensions = [".js", ".ts"];

export default {
  input: "./lib/index.ts",
  plugins: [
    resolve({ extensions }),
    babel({ extensions, include: ["src/**/*"], runtimeHelpers: true }),
    commonjs({
      include: "node_modules/**",
    }),
    typescript(),
  ],
  output: [
    {
      file: pkg.module,
      format: "es",
    },
  ],
};
