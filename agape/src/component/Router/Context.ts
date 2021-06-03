import React from "react";

import { router } from "./state";

import { Router } from "./hook";

const value: any = null;

const Context = React.createContext<State>(value);

export const useContextRouter = () => {
  return React.useContext(Context);
};

export const useRouter = () => {
  return React.useContext(Context).router;
};

export default Context;

/**
 * Typings
 */

interface State {
  state: router.State<string>;
  router: Router;
  disabledBody: boolean;
}
