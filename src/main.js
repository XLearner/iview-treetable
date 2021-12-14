import Vue from 'vue'
import App from './App.vue'
import IView from "view-design";
import Util from "./libs/util.js";

import 'view-design/dist/styles/iview.css';

Vue.use(IView);

Vue.config.productionTip = false
Vue.prototype.$utils = Util;
// Vue.use(Util);

new Vue({
  render: h => h(App),
}).$mount('#app')
