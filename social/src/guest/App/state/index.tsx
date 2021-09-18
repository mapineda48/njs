import React from "react";
import { useAction, Action } from "mapineda48-react/useAction";
import { createStorage } from "mapineda48-react/storage";
import { MIGUEL, FORCE_OPEN } from "../../../socket/type";

import type { IMessage as Message } from "../../../components/Message";

const cache = createStorage<State>("/mapineda48/social/guest/chat");

const reducer = {
  addMessage(state: State, message: Message): State {
    if (message.data === FORCE_OPEN) {
      return { ...state, open: true, unread: 0 };
    }

    const unread = !state.open ? state.unread + 1 : 0;

    return { ...state, unread, messages: [message, ...state.messages] };
  },
  setOnline(state: State, online = true): State {
    if (state.online === online) return state;

    return { ...state, online };
  },
  toggle(state: State): State {
    return { ...state, unread: 0, open: !state.open };
  },
};

export default function useState() {
  const [state, setState] = React.useState((): State => {
    return {
      messages: [],
      unread: 0,
      open: false,
      online: false,
      ...(cache.get() || {}),
    };
  });

  const social = useAction(setState, reducer);

  return [state, social] as const;
}

/**
 * Types
 */
export type Chat = Action<State, Reducer>;

export type Reducer = typeof reducer;

export interface State {
  open: boolean;
  online: boolean;
  messages: Message[];
  unread: number;
}

interface Props {
  children: React.ReactNode;
}
