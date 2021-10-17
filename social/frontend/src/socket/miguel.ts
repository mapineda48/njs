import io from "socket.io-client";
import { event, NAMESPACE, TOKEN } from "@socket";

import type { Message } from "@socket";

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
    onAddMessage(cb: (message: Message) => void) {
      return on(event.addMessage, cb);
    },
    onIsOnlineMiguel(cb: (state: boolean) => void) {
      return on(event.isOnlineMiguel, cb);
    },

    onError(cb: (err: any) => void) {
      return on("error", cb);
    },

    disconnect() {
      return socket.disconnect();
    },

    addMessage(room: string, data: string) {
      socket.emit(event.addMessage, room, data);
    },

    async fetchRooms() {
      return new Promise<string[]>((res, rej) => {
        socket.emit(event.roomsAvailable, (err: any, rooms: string[]) => {
          if (err) return rej(err);

          res(rooms);
        });
      });
    },

    async getPublicKey() {
      return new Promise<string>((res, rej) => {
        socket.emit(event.getPublicKey, (err: any, publicKey: string) => {
          if (err) return rej(err);

          res(publicKey);
        });
      });
    },

    async saveSubscription(sub: PushSubscription) {
      return new Promise<void>((res, rej) => {
        socket.emit(event.saveSubscription, sub, (err: any) => {
          if (err) return rej(err);

          res();
        });
      });
    },

    async removeSubscription(sub: PushSubscription) {
      return new Promise<void>((res, rej) => {
        socket.emit(event.removeSubscription, sub, (err: any) => {
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
