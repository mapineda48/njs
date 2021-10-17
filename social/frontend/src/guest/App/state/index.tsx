import React from "react";
import { initAction } from "mp48-react/useAction";
import { createStorage } from "mp48-react/storage";

import type { IMessage as Message } from "../../../components/Message";

const cache = createStorage<State>("/mapineda48/social/guest/chat");

const useState = initAction({
  addMessage(state: State, message: Message): State {
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
});

export default function useGuest() {
  const [state, , social] = useState((): State => {
    return {
      messages: [],
      unread: 0,
      open: false,
      online: false,
      ...(cache.get() || {}),
    };
  });

  return [state, social] as const;
}

/**
 * Types
 */
export type Chat = ReturnType<typeof useState>[2];

export interface State {
  open: boolean;
  online: boolean;
  messages: Message[];
  unread: number;
}

interface Props {
  children: React.ReactNode;
}
