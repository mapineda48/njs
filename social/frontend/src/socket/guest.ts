import io from "socket.io-client";
import { createStorage } from "mp48-react/storage";
import { NAMESPACE, GUEST } from "@socket/type";
import {
  ADD_MESSAGE,
  MIGUEL_ONLINE,
  FORCE_OPEN,
  GUEST_APP_NOFIFY,
} from "@socket/event";

import type { Message } from "@socket/type";

export default createGuest;

const cache = createStorage<string>("/mapineda48/social/guest/id");

const id = cache.get() || cache.set(getRandom());

export function createGuest() {
  const socket = io(NAMESPACE, {
    auth: {
      [GUEST]: id,
    },
  });

  const on: OnEvent = (event, cb) => {
    socket.on(event, cb);
    return () => {
      socket.off(event, cb);
    };
  };

  return {
    socket,
    appNotify(message: string) {
      socket.emit(GUEST_APP_NOFIFY, message);
    },

    onForceOpen(cb: () => void) {
      return on(FORCE_OPEN, cb);
    },

    onAddMessage(cb: (message: Message) => void) {
      return on(ADD_MESSAGE, cb);
    },
    onIsOnlineMiguel(cb: (state: boolean) => void) {
      return on(MIGUEL_ONLINE, cb);
    },

    onError(cb: (err: any) => void) {
      return on("error", cb);
    },

    async addMessage(data: string) {
      return new Promise<void>((res, rej) => {
        socket.emit(ADD_MESSAGE, data, function onAddMessage(err: any) {
          if (!err) return res();
          rej(err);
        });
      });
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
