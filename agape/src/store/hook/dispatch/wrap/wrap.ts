import * as action from "store/action";

import { Dispatch } from "store";
import { ThunkAction } from "store/middleware/thunk";

export const wrap: Wrap = (dispatch: any, action: any) => {
  const keys = Object.keys(action);

  const obj: any = {};

  keys.forEach((key) => {
    const ref = action[key];

    if (typeof ref === "function") {
      obj[key] = (...args: any[]) => dispatch(ref.call(null, ...args));
    }

    if (typeof ref === "object") {
      obj[key] = wrap(dispatch, ref);
    }
  });

  return obj;
};

/**
 * Typings
 */
export type Creators = typeof action;

type Creator<T extends any[], R extends any> = (
  ...args: T
) => R extends ThunkAction ? ReturnType<R> : R;

export type Result<T extends unknown> = {
  [K in keyof T]: T[K] extends (...args: any) => any
    ? Creator<Parameters<T[K]>, ReturnType<T[K]>>
    : T[K] extends unknown
    ? Result<T[K]>
    : never;
};

type Wrap = (dispatch: Dispatch, action: Creators) => Result<Creators>;
