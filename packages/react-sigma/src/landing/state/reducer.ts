import type { Colombia, Person } from "shared";
import type { Props as Confirm } from "components/Confirm";
import { initConfirm, State } from ".";

export function loading(state: State, isLoading = true): State {
  return { ...state, isLoading };
}

export function confirm(state: State, confirm = initConfirm()): State {
  return { ...state, confirm };
}

export function setColombia(state: State, colombia: Colombia): State {
  return { ...state, colombia };
}
