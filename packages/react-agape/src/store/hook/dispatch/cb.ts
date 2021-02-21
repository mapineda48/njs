import { useDispatch as useDispatchBase } from "../base";
import * as action from "../../action";

import { ThunkAction } from "../../middleware/thunk";

/**
 * Warning
 *
 * Experimental Hook
 */

export const useDispatch: UseDispatch = () => {
  const dispatch = useDispatchBase();

  return (selector: any) => dispatch(selector(action));
};

/**
 * Typings
 */

type Creator = typeof action;

type Action = action.Action | ThunkAction;

export type Selector = (action: Creator) => Action;

export type UseDispatch = () => <
  T extends Action,
  R = T extends ThunkAction ? ReturnType<T> : T
>(
  selector: (action: Creator) => T
) => R;
