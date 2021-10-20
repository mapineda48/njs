import io from "socket.io-client";
import { NAMESPACE, GUEST } from "@socket/type";
import {
  ADD_MESSAGE,
  MIGUEL_ONLINE,
  FORCE_OPEN,
  APP_NOFIFY,
  GUEST_NOTIFY,
} from "@socket/event";

import type { Message } from "@socket/type";

export default createGuest;

export function createGuest(uri = NAMESPACE) {
  const socket = io(uri, {
    auth: {
      [GUEST]: "hi miguel im cool guest",
    },
  });

  const on: OnEvent = (event, cb) => {
    socket.on(event, cb);
    return () => {
      socket.off(event, cb);
    };
  };

  let miguel = "";

  return {
    socket,
    appNotify(message: string) {
      if (!miguel) return;

      socket.emit(APP_NOFIFY, miguel, message);
    },

    onForceOpen(cb: () => void) {
      return on(FORCE_OPEN, cb);
    },

    onAddMessage(cb: (message: Message) => void) {
      return on(ADD_MESSAGE, (message) => {
        cb(message);
      });
    },

    onIsOnlineMiguel(cb: (state: boolean) => void) {
      return on(MIGUEL_ONLINE, (id: string) => {
        /**
         * the event was detected again
         * but miguel and the guest are synchronized.
         */
        if (id === miguel) return;

        const state = Boolean(id);

        /**
         * I forward the event to the server so that the
         * server socket notifies the miguel socket of
         * the existence of this guest.
         */
        if (state) {
          socket.emit(MIGUEL_ONLINE, id);
        }

        miguel = id;

        cb(state);
      });
    },

    onError(cb: (err: any) => void) {
      return on("error", cb);
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
export type Guest = ReturnType<typeof createGuest>;

type OnEvent = (event: string, cb: (...args: any[]) => void) => () => void;
