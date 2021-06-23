import React from "react";
import { useAction, Action } from "mapineda48-react/useAction";
import * as reducer from "./reducer";

export function create(): State {
  return {
    message: "",
    loading: false,
    user: "",
    password: "",
  };
}

export function useState() {
  const [state, setState] = React.useState(create);

  const login = useAction(setState, reducer);

  return [state, login, setState] as const;
}

export default useState;

/**
 * Types
 */

export interface State {
  message: string;
  loading: boolean;
  user: string;
  password: string;
}

export type Login = Action<typeof reducer, State>;
