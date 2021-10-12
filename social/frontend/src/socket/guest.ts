import io from "socket.io-client";
import { createStorage } from "mp48-react/storage";
import { event, NAMESPACE, GUEST } from "@socket";

import type { Message } from "@socket";

export const opt = {
  io,
  url: NAMESPACE,
};

export default createGuest;

const cache = createStorage<string>("/mapineda48/social/guest/id");

const id = cache.get() || cache.set(getRandom());

export function createGuest() {
  const { url, io } = opt;

  const socket = io(url, {
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
    onAddMessage(cb: (message: Message) => void) {
      return on(event.addMessage, cb);
    },
    onIsOnlineMiguel(cb: (state: boolean) => void) {
      return on(event.isOnlineMiguel, cb);
    },

    onError(cb: (err: any) => void) {
      return on("error", cb);
    },

    async addMessage(data: string) {
      return new Promise<void>((res, rej) => {
        socket.emit(event.addMessage, data, function onAddMessage(err: any) {
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