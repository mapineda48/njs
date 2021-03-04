import * as action from "./action";
import * as view from "./view";
import * as notification from "./notification";

export { view, action, notification };

/**
 * Typíngs
 */

export type IView = typeof view;

export type IAction = typeof action;

export type INotification = typeof notification;

export type View<T extends keyof IView = keyof IView> = IView[T];

export type Action<T extends keyof IAction = keyof IAction> = IAction[T];

export type Notification<
  T extends keyof INotification = keyof INotification
> = INotification[T];

export type Types = Action | View | Notification;
