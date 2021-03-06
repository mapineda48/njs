import type { Init } from "../src/App/state";

const map = new Map<number, Init>();

export const state = {
  set(state: Init) {
    const key = Date.now();

    map.set(key, state);

    return key;
  },

  get(val: any): Init {
    const key = parseInt(val);

    if (isNaN(key)) return {};

    const state = map.get(key);

    if (!state) return {};

    map.delete(key);

    return state;
  },

  size() {
    return map.size;
  },

  clear() {
    map.clear();
  },
};

/**
 * Types
 */
export type { Init };
