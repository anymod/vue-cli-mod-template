import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { modId } from "../anymod.js";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount(`#${modId}`);
