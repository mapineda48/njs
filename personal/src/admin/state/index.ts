import React from "react";
import { useAction, Action } from "mapineda-react/useAction";
import * as reducer from "./reducer";
import * as thunk from "./thunk";
import { tab, Tab } from "./type";

import type { Props as Chat } from "admin/Dashboard/Chat";

export function create(): State {
  return {
    token: "",
    tab: tab.CHAT,
    chat: { current: "", keys: [], room: {} },
  };
}

export default function useState() {
  const [state, setState] = React.useState(create);

  const [admin, http] = useAction(setState, reducer, thunk);

  return [state, admin, http, setState] as const;
}

/**
 * Types
 */
export type Http = ReturnType<typeof useState>[2];

export type Admin = Action<Reducer, State>;

export type Reducer = typeof reducer;

export interface State {
  token: string;
  tab: Tab;
  chat: Omit<Chat, "onSend" | "onChange">;
}
