import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/**
 * https://fontawesome.com/icons?m=free
 * https://styde.net/utiliza-font-awesome-como-un-componente-en-vue/
 */

library.add(faHome, faTimes, faCheck);

Vue.component("font-awesome-icon", FontAwesomeIcon);
