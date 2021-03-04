import * as thunk from "redux-thunk";
import { State } from "..";
import { Action } from "../action";

export default thunk.default as thunk.ThunkMiddleware<State, Action>;

/**
 * Typings
 */

export type ThunkAction<T = Promise<void>> = thunk.ThunkAction<
  T,
  State,
  undefined,
  Action
>;

export type ThunkDispatch = thunk.ThunkDispatch<State, undefined, Action>;
