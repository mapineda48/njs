import type { State, Opportunity, Detail } from ".";

export function addopportunity(state: State, opportunity: Opportunity): State {
  return { ...state, opportunity: { ...state.opportunity, ...opportunity } };
}

export function addDetail(state: State, detail: Detail): State {
  return { ...state, detail: { ...state.detail, ...detail } };
}

export function loading(state: State, isLoading = true): State {
  return { ...state, isLoading };
}

export function showMessage(state: State, message: string): State {
  return { ...state, message };
}

export function clearMessge(state: State): State {
  return { ...state, message: "" };
}
