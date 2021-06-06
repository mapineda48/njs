import Vue from "vue";
import Vuex from "vuex";
import { state } from "./state";
import { mutations } from "./mutations";
/**
 * https://dev.to/3vilarthas/vuex-typescript-m4j
 * https://softwarecrafters.io/vuejs/aumenta-productividad-vuex-typescript
 * https://blog.logrocket.com/how-to-write-a-vue-js-app-completely-in-typescript/
 * https://www.npmjs.com/package/vue-property-decorator
 */
Vue.use(Vuex);
const store = new Vuex.Store({
    state,
    mutations,
    getters: {},
    actions: {},
    modules: {}
});
export default store;
//# sourceMappingURL=index.js.map