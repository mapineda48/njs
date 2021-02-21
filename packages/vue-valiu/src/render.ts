import Vue from "vue";
import store from "./store";
import { VueConstructor } from "./decorator";
import "./plugins";
import "./style/index.scss";

Vue.config.productionTip = false;

export default function render(App: VueConstructor) {
  new Vue({
    store,
    render: h => h(App)
  }).$mount("#app");
}
