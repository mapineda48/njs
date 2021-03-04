import * as type from "./type";
import { createEmployee } from "http/table";
import { router } from "component/Router/state";

import { PreviewEmployee } from "shared";

export const state: State = {
  type: type.app.LOGIN,
  employee: createEmployee(),
  token: "",
  root: router.create({ current: type.app.LOGIN }),
  main: router.create({ current: type.main.WELCOME }),
};

/**
 * Typings
 */

export interface State {
  type: type.Types;
  token: string;
  employee: PreviewEmployee;
  root: router.State<type.App>;
  main: router.State<type.Main>;
}
