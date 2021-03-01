import type { State } from ".";

const times: Times = {};

export const maps = {
  setActive(state: State, active: boolean): State {
    return { ...state, maps: { ...state.maps, active } };
  },
  loading(state: State, isLoading = true): State {
    return { ...state, maps: { ...state.maps, isLoading } };
  },
  setMessage(state: State, message: string, onEnd?: OnEnd, time = 3000): State {
    if (onEnd) {
      if (times.maps) clearTimeout(times.maps);
      times.maps = setTimeout(onEnd, time);
    }
    return { ...state, maps: { ...state.maps, message } };
  },
};

/**
 * Types
 */
type OnEnd = () => void;

interface Times {
  maps?: NodeJS.Timeout;
}
