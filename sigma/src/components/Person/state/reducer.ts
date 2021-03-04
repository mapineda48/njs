import { createPerson, State } from ".";

export function fullname(state: State, full_name: string): State {
  return { ...state, person: { ...state.person, full_name } };
}

export function department(state: State, department: string): State {
  return { ...state, person: { ...state.person, city: "", department } };
}

export function city(state: State, city: string): State {
  return { ...state, person: { ...state.person, city } };
}

export function email(state: State, email: string): State {
  return { ...state, person: { ...state.person, email } };
}

export function clear(state: State): State {
  state.cache?.clear();

  return { ...state, person: createPerson() };
}
