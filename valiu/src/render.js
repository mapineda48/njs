import Vue from "vue";
import store from "./store";
import "./plugins";
import "./style/index.scss";
Vue.config.productionTip = false;
export default function render(App) {
    new Vue({
        store,
        render: h => h(App)
    }).$mount("#app");
}
//# sourceMappingURL=render.js.map