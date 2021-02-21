import { event, State } from "../src/Admin/shared";
import type { Server as Socket } from "socket.io";

export default function create(socket: Socket) {
  return {
    change(state: State) {
      socket.emit(event.change, state);
    },
  };
}

/**
 * Types
 */
export type { Socket };
