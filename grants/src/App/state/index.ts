import React from "react";
import * as type from "./type";
import useAction, { useThunk, Action as TAction } from "util/setState";
import { OppHits, RestDetail } from "shared";
import pagination, { Pagination } from "./pagination";
import * as reducer from "./reducer";
import * as thunk from "./thunk";

export function create(): State {
  return {
    current: type.OPPORTUNITYS,
    page: 0,
    opportunitys: [[]],
    detail: null,
    message: null,
    firstRender: true,
    pagination: pagination(1),
    help: true,
  };
}

export default function () {
  const [state, setState] = React.useState(create);

  const action = useAction(setState, reducer);

  const grants = useThunk(action, thunk);

  if (state.firstRender) {
    action.firstRender();
    grants.fetchPage();
  }

  return [state, action, grants] as const;
}

export { type };

/**
 * Typings
 */
type Type = typeof type[keyof typeof type];

export interface State {
  current: Type;
  page: number;
  opportunitys: OppHits[][];
  detail: RestDetail | null;
  message: any;
  firstRender: boolean;
  pagination: Pagination;
  help: boolean;
}

export type SetState = React.Dispatch<React.SetStateAction<State>>;

export type Action = TAction<typeof reducer, State>;
