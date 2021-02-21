import type { State } from "../src/Admin/shared";

export let state: State = {
  maps: false,
};

/**
 * Disabled maps again
 */
let time: NodeJS.Timeout | null = null;

const wait = 600000; //10 min

export function setMaps(active: boolean, onEnd?: OnEnd): State {
  clearTime();
  if (active) {
    time = setTimeout(() => {
      clearTime();
      state = { ...state, maps: false };
      if (onEnd) onEnd(state);
    }, wait);
  }

  return (state = { ...state, maps: active });
}

function clearTime() {
  if (!time) return;
  clearTimeout(time);
  time = null;
}

/**
 * Types
 */
type OnEnd = (state: State) => void;
