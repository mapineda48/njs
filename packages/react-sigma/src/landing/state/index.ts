import React from "react";
import { useAction, IAction } from "mapineda-react/setState";
import * as reducer from "./reducer";
import * as thunk from "./thunk";
import type { Colombia, Person } from "shared";
import type { Props as Confirm } from "components/Confirm";

export function initConfirm(): Confirm {
  return { message: "", onClick: () => {} };
}

function create(): State {
  return {
    colombia: null as any,
    isLoading: false,
    confirm: initConfirm(),
  };
}

export default function useState() {
  const [state, setState] = React.useState(create);

  const [landing, http] = useAction(setState, reducer, thunk);

  return [state, landing, http] as const;
}

/**
 * Types
 */
type Reducer = typeof reducer;

export interface State {
  colombia: Colombia;
  isLoading: boolean;
  confirm: Confirm;
}

export type Landing = IAction<Reducer, State>;
