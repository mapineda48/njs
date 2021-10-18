import io from "socket.io-client";
import { NAMESPACE, TOKEN } from "@socket/type";
import {
  ADD_MESSAGE,
  MIGUEL_ONLINE,
  REMOVE_SUBSCRIPTION,
  ROOMS_AVAILABLE,
  PUBLIC_KEY,
  SAVE_SUBSCRIPTION,
  GUEST_APP_NOFIFY,
} from "@socket/event";

import type { Message } from "@socket/type";

export default createSocket;

export function createSocket(token: string) {
  const socket = io(NAMESPACE, {
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

  return {
    socket,
    onAppNotify(cb: (message: Message) => void) {
      return on(GUEST_APP_NOFIFY, cb);
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

    disconnect() {
      return socket.disconnect();
    },

    addMessage(room: string, data: string) {
      socket.emit(ADD_MESSAGE, room, data);
    },

    async fetchRooms() {
      return new Promise<string[]>((res, rej) => {
        socket.emit(ROOMS_AVAILABLE, (err: any, rooms: string[]) => {
          if (err) return rej(err);

          res(rooms);
        });
      });
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
