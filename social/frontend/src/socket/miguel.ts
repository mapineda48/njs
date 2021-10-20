import io from "socket.io-client";
import { NAMESPACE, TOKEN } from "@socket/type";
import {
  ADD_MESSAGE,
  REMOVE_SUBSCRIPTION,
  PUBLIC_KEY,
  SAVE_SUBSCRIPTION,
  APP_NOFIFY,
  MIGUEL_READY,
  GUEST_ONLINE,
} from "@socket/event";

import type { Message } from "@socket/type";

export default createSocket;

export function createSocket(token: string, uri = NAMESPACE) {
  const socket = io(uri, {
    auth: {
      [TOKEN]: token,
    },
  });

  const on: OnEvent = (event, cb) => {
    socket.on(event, cb);
    return () => {
      socket.off(event, cb);
    };
  };

  socket.on(GUEST_ONLINE, (id: string) => {
    // Join to room id
    socket.emit(GUEST_ONLINE, id);
  });

  return {
    socket,
    ready() {
      socket.emit(MIGUEL_READY);
    },
    onAppNotify(cb: (message: Message) => void) {
      return on(APP_NOFIFY, cb);
    },

    onAddMessage(cb: (message: Message) => void) {
      return on(ADD_MESSAGE, cb);
    },
    onError(cb: (err: any) => void) {
      return on("error", cb);
    },

    disconnect() {
      return socket.disconnect();
    },

    addMessage(room: string, data: string) {
      socket.emit(ADD_MESSAGE, room, data);
    },

    async getPublicKey() {
      return new Promise<string>((res, rej) => {
        socket.emit(PUBLIC_KEY, (err: any, publicKey: string) => {
          if (err) return rej(err);

          res(publicKey);
        });
      });
    },

    async saveSubscription(sub: PushSubscription) {
      return new Promise<void>((res, rej) => {
        socket.emit(SAVE_SUBSCRIPTION, sub, (err: any) => {
          if (err) return rej(err);

          res();
        });
      });
    },

    async removeSubscription(sub: PushSubscription) {
      return new Promise<void>((res, rej) => {
        socket.emit(REMOVE_SUBSCRIPTION, sub, (err: any) => {
          if (err) return rej(err);

          res();
        });
      });
    },
  };
}

/**
 * Types
 */
export type Socket = ReturnType<typeof createSocket>;

type OnEvent = (event: string, cb: (...args: any[]) => void) => () => void;
