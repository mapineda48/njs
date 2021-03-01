import { io } from "socket.io-client";
import { event, State } from "../shared";
import mock from "../development/socket";
import type { Admin } from "../state";

function createSocket(admin: Admin) {
  const socket = io();

  socket.on(event.change, (data: State) => {
    admin.maps.setActive(data.maps);
  });
}

export default process.env.NODE_ENV === "development" ? mock : createSocket;

/**
 * Types
 */

export type CreateSocket = typeof createSocket;
