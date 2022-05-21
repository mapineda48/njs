import io from "socket.io-client";
import { NAMESPACE, AUTH_MIGUEL } from "@socket/type";
import {
  ADD_MESSAGE,
  GUEST_ONLINE,
  MIGUEL_READY,
  REMOVE_SUBSCRIPTION,
  SAVE_SUBSCRIPTION,
  PUBLIC_KEY,
  GET_MESSAGES,
  GET_GUESTS,
} from "@socket/event";
import { HOST } from "../../env";

import type { Message } from "@socket/type";
import type { Guest as ModelGuest } from "@model/Guest";
import type { IMessage } from "../../components/Message";

export function createSocket(token: string) {
  const socket = io(HOST + NAMESPACE, {
    auth: {
      [AUTH_MIGUEL]: token,
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
    onAddMessage(cb: (room: string, message: IMessage) => void) {
      return on(ADD_MESSAGE, (message: Message) => {
        const { room, writeBy, data } = message;

        cb(room, {
          right: writeBy === room,
          data,
        });
      });
    },

    onError(cb: (err: any) => void) {
      return on("error", cb);
    },

    onGuestOnline(cb: (room: string, isOnline: boolean) => void) {
      return on(GUEST_ONLINE, (room: string, isOnline: boolean) => {
        socket.emit(GUEST_ONLINE, room, isOnline);
        cb(room, isOnline);
      });
    },

    async getGuest(page: number) {
      return new Promise<ModelGuest[]>((res, rej) => {
        socket.emit(GET_GUESTS, page, (err: any, guests: ModelGuest[]) => {
          if (err) {
            return rej(err);
          }

          res(guests);
        });
      });
    },

    async getMessages(room: string, page: number) {
      return new Promise<IMessage[]>((res, rej) => {
        socket.emit(
          GET_MESSAGES,
          room,
          page,
          (err: any, messages: Message[]) => {
            if (err) {
              return rej(err);
            }
            res(
              messages.map(({ writeBy, room, data }) => ({
                right: writeBy === room,
                data,
              }))
            );
          }
        );
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

    async ready() {
      return new Promise<string[]>((res, rej) => {
        socket.emit(MIGUEL_READY, (err: any, rooms: string[]) => {
          if (err) {
            return rej(err);
          }

          res(rooms);
        });
      });
    },

    addMessage(room: string, data: string) {
      socket.emit(ADD_MESSAGE, room, data);
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
