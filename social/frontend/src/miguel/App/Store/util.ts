import { AnyAction, Dispatch } from "redux";

export function prepareDispatch<T>(
  dispatch: Dispatch<AnyAction>,
  actions: T
): T {
  return Object.fromEntries(
    Object.entries(actions).map(([key, action]: any) => [
      key,
      typeof action === "function"
        ? function (this: any, ...args: any[]) {
            return dispatch(action.call(this, ...args));
          }
        : prepareDispatch(dispatch, action),
    ])
  ) as any;
}
