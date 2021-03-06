import React from "react";
import { useAction, Action } from "mapineda-react/useAction";
import * as reducer from "./reducer";
import * as thunk from "./thunk";

import type { OppHits, RestDetail } from "../../shared";

export function create(state: Init = {}): State {
  return {
    isLoading: false,
    message: "",
    opportunity: {},
    detail: {},
    ...state,
  };
}

export default function useState(init?: Init) {
  const [state, setState] = React.useState(() => create(init));

  const [grants, http] = useAction(setState, reducer, thunk);

  return [state, grants, http, setState] as const;
}

/**
 * Types
 */
export type Grants = Action<Reducer, State>;

export type Reducer = typeof reducer;

export type Http = ReturnType<typeof useState>[2];

export interface Opportunity {
  [K: string]: OppHits[];
}

export interface Detail {
  [K: string]: RestDetail;
}

export type Init = Partial<State>;

export interface State {
  isLoading: boolean;
  message: string;
  opportunity: Opportunity;
  detail: Detail;
}
