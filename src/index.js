/*
 * @Author: your name
 * @Date: 2021-12-14 22:39:24
 * @LastEditTime: 2021-12-14 22:43:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tree-table\src\index.js
 */
import Vue from "vue";

import TreeTable from "./TreeTable/TreeTable.vue";

const install = function (Vue, opts = {}) {
  if (install.installed) return;
  Vue.component("TreeTable", TreeTable);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default function () {
  return {
    install: install,
  }
}
