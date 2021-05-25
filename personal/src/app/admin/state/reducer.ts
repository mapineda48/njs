import type { State } from ".";
import type { ResSession, DataMessage, DataRoom } from "app/service";

export function setToken(state: State, session: ResSession): State {
  return { ...state, token: session.token };
}

export function addRoom(state: State, room: DataRoom): State {
  if (state.chat.room[room.id]) {
    return {
      ...state,
      chat: {
        ...state.chat,
        room: {
          ...state.chat.room,
          [room.id]: {
            ...state.chat.room[room.id],
            pathname: room.pathname,
          },
        },
      },
    };
  }

  return {
    ...state,
    chat: {
      ...state.chat,
      room: {
        ...state.chat.room,
        [room.id]: { ...room },
      },
      messages: {
        [room.id]: [],
      },
    },
  };
}

export function changeRoom(state: State, room: string): State {
  return {
    ...state,
    chat: { ...state.chat, current: room },
  };
}

export function addMessage(state: State, data: DataMessage): State {
  const { id, message } = data;

  return {
    ...state,
    chat: {
      ...state.chat,
      room: {
        ...state.chat.room,
      },
      messages: {
        ...state.chat.messages,
        [id]: state.chat.messages[id]
          ? [...state.chat.messages[id], message]
          : [message],
      },
    },
  };
}
