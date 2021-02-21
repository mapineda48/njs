import React from "react";
import { useAction } from "mapineda-react/setState";
import * as reducer from "./reducer";
import * as thunk from "./thunk";
import { Record } from "shared";
import * as type from "./type";

function createPerson(): Record {
  return {
    id: 0,
    full_name: "",
    department: "",
    city: "",
    email: "",
  };
}

function create(): State {
  return {
    view: type.WELCOME,
    person: createPerson(),
    persons: [],
    message: "",
    reandOnly: false,
  };
}

export function useSigmaState() {
  const [state, setState] = React.useState(create);

  const [sigma,_thunk] = useAction(setState, reducer,thunk);

  return [state, sigma, _thunk] as const;
}

const value: any = null;

export const Context = React.createContext<Sigma>(value);

export function useSigma() {
  return React.useContext(Context);
}

export default function ({ children }: Props) {
  const value = useSigmaState();

  return React.createElement(Context.Provider, { value, children });
}

export { type };

/**
 * Types
 */
type View = typeof type[keyof typeof type];

export interface State {
  view: View;
  person: Record;
  persons: Record[];
  message: string;
  reandOnly: boolean;
}

export type Sigma = ReturnType<typeof useSigmaState>;

export type Action = Sigma[1];

interface Props {
  children: React.ReactNode;
}
