import * as action from "./action";
import * as app from "./app";
import * as main from "./main";

export { action, app, main };

/**
 * Typings
 */
export type IAction = typeof action;

export type IApp = typeof app;

export type IMain = typeof main;

export type App<T extends keyof IApp = keyof IApp> = IApp[T];

export type Main<T extends keyof IMain = keyof IMain> = IMain[T];

export type Action<T extends keyof IAction = keyof IAction> = IAction[T];

export type Types = Action | App | Main;
