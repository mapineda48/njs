import * as view from "./view";
import * as action from "./action";

export { view, action };

/**
 * Typings
 */
export type IView = typeof view;

export type IAction = typeof action;

export type View<T extends keyof IView = keyof IView> = IView[T];

export type Action<T extends keyof IAction = keyof IAction> = IAction[T];

export type Type = Action;
