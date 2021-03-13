import { FORCE_OPEN } from "production";

import type { State } from ".";
import type { Message, ResOnline } from "production";

export function addMessage(state: State, message: Message): State {
  if (message.content === FORCE_OPEN) {
    return { ...state, open: true, unread: 0 };
  }

  const unread = !state.open ? state.unread + 1 : 0;

  return { ...state, unread, messages: [...state.messages, message] };
}

export function setOnline(state: State, res: ResOnline): State {
  if (state.isOnline === res.online) return state;

  return { ...state, isOnline: res.online };
}

export function toggle(state: State): State {
  return { ...state, unread: 0, open: !state.open };
}
