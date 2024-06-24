#!/usr/bin/env node

import { rollup } from "rollup/dist/rollup.js";
import { ensureArray, mergeOptions } from "rollup/dist/shared/rollup.js";
import config from "./rollup.config.js";
import configs from "./rollup.configs.js";

const build = async () => {
  const optionsList = await Promise.all(
    ensureArray(
      // 多个文件编译
      configs.concat([config])
    ).map((config) => mergeOptions(config))
  );
  for (let item of optionsList) {
    const { output = [] } = item;
    const bundle = await rollup(item);

    for (let $item of output) {
      await bundle.write($item);
    }
  }

  // 编译完成后关闭程序
  console.log("编译完成，关闭程序...");
  process.exit(0); // 正常退出
};

// build();

build().catch((error) => {
  console.error(error);
  process.exit(1); // 非正常退出
});
