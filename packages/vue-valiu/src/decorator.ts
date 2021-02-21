import * as core from "vue-property-decorator";
import { VueConstructor as VConstructor } from "vue";
import { Vue as VueCore } from "vue/types/vue";
import { Store } from "./store";

/**
 * the only reason this file exists is to wrap vue's main class with project types
 */

export const Vue: VueConstructor = core.Vue;

export const Component = core.Component;

export const Prop = core.Prop;

/**
 * Types
 */

export type PVue = Omit<VueCore, "$store"> & { $store: Store };

export type VueConstructor = VConstructor<PVue>;
