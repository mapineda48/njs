import { AMOUNT_PAGE } from "@socket/type";
import { initReducer } from "mp48-react/useState";

import type { IMessage as Message } from "../../../components/Message";

const useState = initReducer({
  setIframe(state: State, iframe: HostIframe): State {
    return { ...state, iframe };
  },

  isLoading(state: State, isLoading = true): State {
    return { ...state, isLoading };
  },

  sync(state: State): State {
    return { ...state, isSync: true, isLoading: false };
  },

  loadMessages(state: State, messages: Message[]): State {
    const isLoadAllMessages = messages.length < AMOUNT_PAGE;

    return {
      ...state,
      messages: [...state.messages, ...messages],
      nextPage: state.nextPage + 1,
      isLoadAllMessages,
      isLoading: false,
    };
  },

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

  openChat(state: State): State {
    if (state.open) return state;

    return { ...state, open: true };
  },
});

export default function useGuest() {
  const [state, , social] = useState((): State => {
    return {
      messages: [],
      iframe: null,
      unread: 0,
      open: false,
      online: false,
      isSync: false,
      nextPage: 1,
      isLoadAllMessages: false,
      isLoading: false,
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
  iframe: HostIframe | null;
  unread: number;
  nextPage: number;
  isLoadAllMessages: boolean;
  isSync: boolean;
  isLoading: boolean;
}

export interface HostIframe {
  origin: string;
  app: string;
}
