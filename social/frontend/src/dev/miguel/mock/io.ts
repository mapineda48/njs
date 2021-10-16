import { event, MIGUEL } from "@socket";
import { wait } from "./axios";

import type { Message } from "@socket";
/**
 * Mock Server Socket
 */

export const server = {
  /**
   * Handlers Events
   */
  pairs: {} as Listeners,
  /**
   * Emit Events
   */
  emit(event: string, data: any) {
    if (typeof data === "function") {
      return data();
    }

    if (!this.pairs[event]) {
      console.log(this.pairs);
      throw new Error(`missing event "${event}"`);
    }

    console.log({
      action: "emit",
      event,
      data,
      handlers: this.pairs[event],
    });
    this.pairs[event].forEach((handler: any) => handler(data));
  },
  /**
   * Set Handler Events
   */
  on(event: string, ...args: any[]) {
    console.log(`add listener to event "${event}"`);

    if (!this.pairs[event]) {
      this.pairs[event] = [];
    }

    const [handler] = args;

    if (typeof handler === "function") {
      this.pairs[event].push(handler);
    }
  },

  off(event: string, ...args: any[]) {
    console.log(`remove listener to event "${event}"`);

    const [handler] = args;

    this.pairs[event] = this.pairs[event].filter((cb: any) => cb === handler);
  },
};

const rooms: string[] = [];

while (rooms.length < 25) {
  rooms.push(Date.now() + rooms.length + "");
}

export default function mockIO() {
  console.log("mock io miguel");

  const id = "12345";

  return {
    disconnect() {
      server.pairs = {};
    },
    on(e: string, ...args: any[]) {
      server.on(e, ...args);
    },
    off(e: string, ...args: any[]) {
      server.off(e, ...args);
    },
    emit(e: string, ...args: any[]) {
      const [data] = args;

      if (e === event.roomsAvailable) {
        wait("foo").then(() => {
          data(null, rooms);

          const [id] = rooms;

          const messages: Message[] = [];

          while (messages.length < 10) {
            messages.push({
              room: id,
              writeBy: id,
              data: Date.now() + messages.length + "",
            });
          }

          messages.forEach((m, i) => {
            wait(m.data, i * 1000)
              .then(() => {
                server.emit(event.addMessage, m);
              })
              .catch(console.error);
          });
        });

        return;
      }

      if (e === event.addMessage) {
        const message: Message = { room: rooms[0], writeBy: MIGUEL, data };
        server.emit(e, message);
        return;
      }

      server.emit(e, data);
    },
  } as any;
}

/**
 * Types
 */

interface Listeners {
  [K: string]: ((data: any) => void)[];
}
