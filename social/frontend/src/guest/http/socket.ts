import io from "socket.io-client";
import { NAMESPACE, AUTH_GUEST } from "@socket/type";
import {
  ADD_MESSAGE,
  MIGUEL_ONLINE,
  FORCE_OPEN,
  APP_NOFIFY,
  GET_MESSAGES,
  GUEST_ORIGIN,
} from "@socket/event";
import { HOST } from "../../env";

import type { Message as SocketMessage } from "@socket/type";
import type { IMessage as ChatMessage } from "../../components/Message";

export default createSocket;

export function createSocket(id: string) {
  const socket = io(HOST + NAMESPACE, {
    auth: {
      [AUTH_GUEST]: id,
    },
  });

  const on: OnEvent = (event, cb) => {
    socket.on(event, cb);
    return () => {
      socket.off(event, cb);
    };
  };

  return {
    id,
    onForceOpen(cb: () => void) {
      return on(FORCE_OPEN, cb);
    },

    onAddMessage(cb: (message: ChatMessage) => void) {
      return on(ADD_MESSAGE, (message: SocketMessage) => {
        const { data, writeBy } = message;

        cb({
          data,
          right: writeBy !== id,
        });
      });
    },

    onMiguelOnline(cb: (state: boolean) => void) {
      return on(MIGUEL_ONLINE, cb);
    },

    onError(cb: (err: any) => void) {
      return on("error", cb);
    },

    iframe(origin: string, demo: string) {
      socket.emit(GUEST_ORIGIN, origin, demo);
    },

    async getMessages(page: number) {
      return new Promise<ChatMessage[]>((res, rej) => {
        socket.emit(
          GET_MESSAGES,
          page,
          (err: any, messages: SocketMessage[]) => {
            if (err) {
              return rej(err);
            }

            res(
              messages.map(({ writeBy, data }) => ({
                data,
                right: writeBy !== id,
              }))
            );
          }
        );
      });
    },

    appNotify(message: string) {
      socket.emit(APP_NOFIFY, message);
    },

    addMessage(data: string) {
      socket.emit(ADD_MESSAGE, data);
    },
  };
}

/**
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 */

export function getRandom() {
  return Math.random().toString(36).substring(2);
}

/**
 * Types
 */
export type Guest = ReturnType<typeof createSocket> extends Promise<infer R>
  ? R
  : never;

type OnEvent = (event: string, cb: (...args: any[]) => void) => () => void;
