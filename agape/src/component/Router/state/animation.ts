export const setIn = (): State => {
  return { in: true, active: true };
};

export const setOut = (): State => {
  return { in: false, active: true };
};

export const setEnd = (state: State): State => {
  return { ...state, active: false };
};

export const setDisabled = (): State => {
  return { in: false, active: false };
};

export const isDisabled = (state: State) => !state.in && !state.active;

export const setToggle = (state: State): State => {
  return { in: !state.in, active: true };
};

export interface State {
  in: boolean;
  active: boolean;
}
