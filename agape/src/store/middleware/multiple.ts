import { Middleware, Dispatch } from "redux";
import { State } from "..";
import { Action } from "../action";

/**
 * https://medium.com/@joedski/javascript-redux-dispatching-multiple-actions-4b74831cbb
 */
export const middleware: Multiple = (store) => {
  return (next) => {
    return (action) => {
      if (!Array.isArray(action)) return next(action);
      return action.map((a) => store.dispatch(a));
    };
  };
};

export default middleware;

/**
 * Typings
 */

type Multiple = Middleware<DispatchExt, State, Dispatch<Action>>;

export interface DispatchExt {
  (actions: Action[]): void;
}
