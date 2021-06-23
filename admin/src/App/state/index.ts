import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAction, Action } from "mapineda48-react/useAction";
import * as reducer from "./reducer";
import { createThunk } from "./thunk";
import { token } from "./storage";
import route from "../../route";

import type { Props as Dialog } from "../../Dialog";

export function create(): State {
  return {
    token: token.get(),
    isLoading: false,
    dialog: null,
    sync: false,
  };
}

export default function useState() {
  const [state, setState] = React.useState(create);

  const history = useHistory();

  const location = useLocation();

  const thunk = React.useMemo(() => createThunk(history), [history]);

  const [auth, http] = useAction(setState, reducer, thunk);

  const inLogin = location.pathname === route.login;

  React.useEffect(() => {
    if (!state.isLoading && !state.dialog) {
      if (state.token && state.sync && inLogin) {
        history.replace(route.dashboard);
      } else if (state.token && !state.sync) {
        http.isToken();
      } else if (!state.token && !inLogin) {
        history.replace(route.login);
      } else if (inLogin && !state.sync) {
        auth.sync();
      }
    }
  });

  return [state, auth, http, setState] as const;
}

/**
 * Types
 */
export type Http = ReturnType<typeof useState>[2];

export type App = Action<typeof reducer, State>;

export interface State {
  token: string | null;
  isLoading: boolean;
  dialog: Dialog | null;
  sync: boolean;
}
