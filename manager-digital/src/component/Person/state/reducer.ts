import { create } from ".";

import type { State } from ".";

export function fullName(state: State, full_name: string): State {
  return { ...state, full_name };
}
export function dni(state: State, val: string): State {
  const dni = parseInt(val);

  return { ...state, dni };
}
export function address(state: State, address: string): State {
  return { ...state, address };
}
export function email(state: State, email: string): State {
  return { ...state, email };
}

export function clear(state: State) {
  return create();
}