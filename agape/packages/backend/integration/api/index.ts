import path from "./path.json";
import type { IAgape } from "./agape";
import type { IApi } from "./util";
import { Authentication } from "../public";

export { path };

/**
 * Types
 */

export type IFrontEnd = IApi<Path, IBackend>;

interface IBackend {
  authenticate: (credential: Authentication) => string;
  welcome: IWelcome;
  agape: IAgape;
}

interface IWelcome {
  greet: () => string;
  helloWorld: (value: string) => string;
}

type Path = typeof path;

type IFoo = typeof import("./type").default;
