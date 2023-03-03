import nodeResolve from "rollup-plugin-node-resolve"; // 帮助寻找node_modules里的包
import babel from "rollup-plugin-babel"; // rollup 的 babel 插件，ES6转ES5
import replace from "rollup-plugin-replace"; // 替换待打包文件里的一些变量，如 process在浏览器端是不存在的，需要被替换
import commonjs from "rollup-plugin-commonjs"; // 将非ES6语法的包转为ES6可用
import { uglify } from "rollup-plugin-uglify"; // 压缩包
import postcss from "rollup-plugin-postcss";
import path from "path";
const env = process.env.NODE_ENV;
const config = {
  input: path.join(process.cwd(), "/src/index.js"),
  external: ["react", "redux"], // 告诉rollup，不打包react,redux;将其视为外部依赖
  output: [
    {
      file: "dist/es/index.js",
      format: "es",
      sourcemap: true,
      globals: {
        react: "React", // 这跟external 是配套使用的，指明global.React即是外部依赖react
        redux: "Redux",
      },
    },
    {
      file: "dist/umd/index.js",
      format: "umd",
      name: "index",
      sourcemap: true,
      globals: {
        react: "React", // 这跟external 是配套使用的，指明global.React即是外部依赖react
        redux: "Redux",
      },
    },
    {
      file: "dist/amd/index.js",
      format: "amd",
      name: "index",
      sourcemap: true,
      globals: {
        react: "React", // 这跟external 是配套使用的，指明global.React即是外部依赖react
        redux: "Redux",
      },
    },
    {
      file: "dist/cjs/index.js",
      name: "index",
      format: "cjs",
      sourcemap: true,
      globals: {
        react: "React", // 这跟external 是配套使用的，指明global.React即是外部依赖react
        redux: "Redux",
      },
    },

    {
      file: "dist/iife/index.js",
      name: "index",
      format: "iife",
      sourcemap: true,
      globals: {
        react: "React", // 这跟external 是配套使用的，指明global.React即是外部依赖react
        redux: "Redux",
      },
    },

    {
      file: "dist/system/index.js",
      name: "index",
      format: "system",
      sourcemap: true,
      globals: {
        react: "React", // 这跟external 是配套使用的，指明global.React即是外部依赖react
        redux: "Redux",
      },
    },
  ],
  plugins: [
    nodeResolve(),
    babel({
      exclude: "**/node_modules/**",
      runtimeHelpers: true,
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env),
    }),
    commonjs(),
    postcss(), // css
    // less(),  // css
    // scss(),
  ],
};

if (env === "production") {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        // warnings: false,
      },
    })
  );
}
export default config;
