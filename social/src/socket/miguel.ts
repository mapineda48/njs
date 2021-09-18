import io from "socket.io-client";
import { event, NAMESPACE, TOKEN } from "./type";

import type { Message } from "./type";

export const prod = {
  io,
  url: NAMESPACE,
};

export default createSocket;

export function createSocket(token: string) {
  const { url, io } = prod;

  const socket = io(url, {
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
  };
}

/**
 * Types
 */
export type Socket = ReturnType<typeof createSocket>;

type OnEvent = (event: string, cb: (...args: any[]) => void) => () => void;
