import { create, State } from ".";

import type { ResSession } from "app/service";

export function setUsername(state: State, username: string): State {
  return { ...state, username, message: "" };
}

export function setPassword(state: State, password: string): State {
  return { ...state, password, message: "" };
}

export function loading(state: State, isLoading = true): State {
  return { ...state, isLoading };
}

export function setMessage(state: State, message: string): State {
  return { ...state, message };
}

export function setSession(state: State, session:ResSession): State {
  return { ...create(), session };
}

export function clear(state: State): State {
  return create();
}

/**
 * Types
 */
