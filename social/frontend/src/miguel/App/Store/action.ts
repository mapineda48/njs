import { actions as counter } from "./slice/counter";
import { actions as room } from "./slice/room";
import type { Dispatch, AnyAction } from "redux";

const action = {
  counter,
  room,
};

export function prepareActions(
  dispatch: Dispatch<AnyAction>,
  actions = action
): Action {
  return Object.fromEntries(
    Object.entries(actions).map(([key, action]: any) => [
      key,
      typeof action === "function"
        ? function (...args: any[]) {
            dispatch(action(...args));
          }
        : prepareActions(dispatch, action),
    ])
  ) as any;
}

/**
 * Types
 */

export type Action = typeof action;
