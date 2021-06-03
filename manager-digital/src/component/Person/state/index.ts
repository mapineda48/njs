import React from "react";
import { useAction, Action } from "mapineda48-react/useAction";
import * as reducer from "./reducer";

import type { Record } from "service";

export function create(init?: Record): State {
  return {
    id: 0,
    full_name: "",
    dni: 0,
    address: "",
    email: "",
    ...init,
  };
}

export function useState(init?: Record) {
  const [state, setState] = React.useState(() => create(init));

  const person = useAction(setState, reducer);

  return [state, person, setState] as const;
}

/**
 * Types
 */
export type Reducer = Action<typeof reducer, State>;

export interface State extends Record {}
