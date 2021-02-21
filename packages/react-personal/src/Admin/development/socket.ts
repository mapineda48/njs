import { event, State } from "../shared";
import type { CreateSocket } from "../socket";

export const socket = {
  /**
   * Handlers Events
   */
  pairs: {} as Pair,
  /**
   * Emit Events
   */
  emit(event: string, data: any) {
    console.log(`socket emit "${event}"`, data);
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

const mock: CreateSocket = (admin) => {
  socket.on(event.change, (data: State) => {
    admin.maps.setActive(data.maps);
  });
};

export default mock;

/**
 * Types
 */
interface Pair {
  [K: string]: ((data: any) => void)[];
}
