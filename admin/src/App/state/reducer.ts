import { create } from ".";
import { token as tokenStorage } from "./storage";

import type { State } from ".";
import type { Props as Dialog } from "../../Dialog";

export function sync(state: State, sync = true) {
  return { ...state, sync };
}

export function dialog(state: State, props: Dialog): State {
  return { ...state, dialog: props };
}

export function loading(state: State, isLoading = true): State {
  return { ...state, isLoading };
}

export function clearToken(state: State): State {
  return { ...state, token: tokenStorage.clear() };
}

export function setToken(state: State, token: string): State {
  return { ...state, token: tokenStorage.set(token), sync: true };
}

export function reset(state: State) {
  tokenStorage.clear();
  return create();
}
