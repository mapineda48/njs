import type { State } from ".";
import type { Session, PostMessage } from "production/http";

export function setToken(state: State, session: Session): State {
  return { ...state, token: session.token };
}

export function addRoom(state: State, room: string): State {
  if (state.chat.room[room]) return state;

  return {
    ...state,
    chat: { ...state.chat, room: { ...state.chat.room, [room]: [] } },
  };
}

export function changeRoom(state: State, room: string): State {
  return {
    ...state,
    chat: { ...state.chat, current: room },
  };
}

export function addMessage(state: State, data: PostMessage): State {
  const { id, message } = data;

  return {
    ...state,
    chat: {
      ...state.chat,
      room: {
        ...state.chat.room,
        [id]: state.chat.room[id]
          ? [...state.chat.room[id], message]
          : [message],
      },
    },
  };
}
