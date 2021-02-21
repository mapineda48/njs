import * as type from "./type";
import { State } from ".";
import { Record } from "shared";

export function loading(state: State): State {
  return { ...state, reandOnly: true };
}

export function welcome(state: State): State {
  return { ...state, view: type.WELCOME, reandOnly: false, persons: [] };
}

export function search(state: State): State {
  return { ...state, view: type.SEARCH, reandOnly: false };
}

export function create(state: State): State {
  return { ...state, view: type.CREATE, reandOnly: false };
}

export function notify(state: State, message: string): State {
  return { ...state, message, view: type.NOTIFY, reandOnly: false };
}

export function persons(state: State, persons: Record[]): State {
  return {
    ...state,
    persons: [...persons],
    view: type.PERSONS,
    reandOnly: true,
  };
}

export function back(state: State): State {
  if (state.persons.length) {
    return { ...state, view: type.PERSONS };
  }

  return { ...state, view: type.WELCOME, reandOnly: false };
}

export function edit(state: State): State {
  return { ...state, reandOnly: false };
}

export function person(state: State, person: Record): State {
  return {
    ...state,
    person: { ...person },
    view: type.PERSON,
    reandOnly: true,
  };
}
