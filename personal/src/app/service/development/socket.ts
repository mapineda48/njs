import { event } from "..";

import type { Socket } from "../socket/client";

/**
 * Auth
 */
export const token = "im a secret token";

/**
 * Socket
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
    console.log(`socket emit "${event}"`);
    this.pairs[event].forEach((handler) => handler(data));
  },
  /**
   * Set Handler Events
   */
  on(event: string, handler: (data: any) => void) {
    if (!this.pairs[event]) {
      this.pairs[event] = [];
    }
    this.pairs[event].push(handler);
  },
};

export const client: Socket = {
  guess(chat, id) {
    const idEvent = event.addMessage(id);

    server.on(idEvent, (message) => {
      chat.addMessage(message);
    });

    server.on(event.type.ONLINE, (data) => chat.setOnline(data));

    return {
      disconnect() {},
    } as any;
  },

  admin(admin, token) {
    const idEvent = event.addMessage(token);

    server.on(idEvent, (data) => {
      admin.addMessage(data);
    });

    server.on(event.type.ADDROOM, (data) => admin.addRoom(data.room));

    return {
      disconnect() {},
    } as any;
  },
};

/**
 * Types
 */

interface Listeners {
  [K: string]: ((data: any) => void)[];
}
