import { event, MIGUEL } from "@socket";

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

/**
 * Mock socket Chat Miguel
 */
let isOnlineMiguel = false;

export const mockMiguel = {
  toggleOnline() {
    isOnlineMiguel = !isOnlineMiguel;
    server.emit(event.isOnlineMiguel, isOnlineMiguel);
  },

  addMessage(data: string) {
    const message: Message = { writeBy: MIGUEL, data, room: "unknown" };

    server.emit(event.addMessage, message);
  },
};

export default function mockIO() {
  console.log("called mock io");

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

      if (e === event.addMessage) {
        const message: Message = { writeBy: id, data, room: "known" };
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

export type Miguel = typeof mockMiguel;
