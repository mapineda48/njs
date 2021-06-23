import { create } from ".";

import type { State } from ".";

export function message(state: State, message: string): State {
  return { ...state, message, loading: false };
}

export function user(state: State, user: string): State {
  return { ...state, user, message: "" };
}

export function password(state: State, password: string): State {
  return { ...state, password, message: "" };
}

export function loading(state: State, loading = true): State {
  return { ...state, loading };
}

export function reset(state: State): State {
  return create();
}
