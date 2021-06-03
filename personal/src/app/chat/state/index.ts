import React from "react";
import { useAction, Action } from "mapineda48-react/useAction";
import * as reducer from "./reducer";
import * as thunk from "./thunk";
import { getRandom } from "app/service";
import type { Message }  from "app/service";

const keySession = "@mapineda48/personal/chat";

export default function useState() {
  const [state, setState] = React.useState(create);

  const [chat, http] = useAction(setState, reducer, thunk);

  saveCache(state);

  return [state, chat, http, setState] as const;
}

export function create(): State {
  const id = Date.now() + "-" + getRandom();

  return {
    id,
    messages: [],
    unread: 0,
    open: false,
    ...loadCache(),
    isOnline: false,
  };
}

function loadCache(): Partial<State> {
  try {
    const data = sessionStorage.getItem(keySession);

    if (!data) return {};

    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return {};
  }
}

function saveCache(state: State): void {
  try {
    const data = JSON.stringify(state);

    sessionStorage.setItem(keySession, data);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Types
 */
export type Http = ReturnType<typeof useState>[2];

export type Chat = Action<Reducer, State>;

export type Reducer = typeof reducer;

export interface State {
  open: boolean;
  isOnline: boolean;
  id: string;
  messages: Message[];
  unread: number;
}
