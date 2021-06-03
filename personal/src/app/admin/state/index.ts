import React from "react";
import { useAction, Action } from "mapineda48-react/useAction";
import * as reducer from "./reducer";
import * as thunk from "./thunk";
import { tab, Tab } from "./type";

import type { DataRoom, Message } from "app/service";

export function create(): State {
  return {
    token: "",
    tab: tab.CHAT,
    chat: {
      current: "",
      room: {},
      messages: {},
    },
  };
}

export default function useState(init?: State) {
  const [state, setState] = React.useState(init || create);

  const [admin, http] = useAction(setState, reducer, thunk);

  return [state, admin, http, setState] as const;
}

/**
 * Types
 */
export type { Message };

export type Http = ReturnType<typeof useState>[2];

export type Admin = Action<Reducer, State>;

export type Reducer = typeof reducer;

export interface State {
  token: string;
  tab: Tab;
  chat: Chat;
}

interface Chat {
  current: string;
  room: {
    [K: string]: DataRoom;
  };
  messages: {
    [K: string]: Message[];
  };
}

export interface Room {
  [K: string]: DataRoom;
}

export interface Messages {
  [K: string]: Message[];
}
