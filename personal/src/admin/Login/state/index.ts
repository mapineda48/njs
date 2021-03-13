import React from "react";
import { useAction, Action } from "mapineda-react/useAction";
import * as reducer from "./reducer";
import * as thunk from "./thunk";

import type { Session } from "service";

export function create(): State {
  return {
    username: "",
    password: "",
    isLoading: false,
    message: "",
    session: null,
  };
}

export default function useState() {
  const [state, setState] = React.useState(create);

  const [login, http] = useAction(setState, reducer, thunk);

  return [state, login, http, setState] as const;
}

/**
 * Types
 */
export type Login = Action<Reducer, State>;

export type Reducer = typeof reducer;

export interface State {
  username: string;
  password: string;
  isLoading: boolean;
  message: string;
  session: null | Session;
}
