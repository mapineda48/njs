import { NAMESPACE, GUEST, TOKEN, event, MIGUEL } from "../src/socket/type";

import type { Namespace, Server as ServerIO, Socket } from "socket.io";
import type { Message } from "../src/socket/type";

/**
 * We store the IDs of the clients so that when Miguel
 * is online to notify him.
 */
const guests = new Set<string>();

/**
 * Miguel's socket reference
 */
let miguel: Socket | null = null;

export function connectMiguel(socket: Socket) {
  miguel = socket;

  const rooms = getGuestsAvailable();

  socket.join(rooms);

  /**
   * Join all rooms available
   */
  socket.to(rooms).emit(event.isOnlineMiguel, true);

  /**
   * Send rooms to client
   */
  socket.on(event.roomsAvailable, (cb) => {
    cb(null, rooms);
  });

  socket.on(event.addMessage, (room, data) => {
    const message: Message = { room, writeBy: MIGUEL, data };

    socket.nsp.to(room).emit(event.addMessage, message);
  });

  socket.on("disconnect", () => {
    miguel = null;

    const rooms = getGuestsAvailable();

    socket.to(rooms).emit(event.isOnlineMiguel, false);
  });
}

export function getGuestsAvailable() {
  return Array.from(guests);
}

function connectGuest(socket: Socket, id: string) {
  socket.join(id);

  socket.nsp.emit(event.guestOnline);

  if (miguel) {
    miguel.join(id);

    const message: Message = { room: id, writeBy: id, data: "connect" };

    miguel.emit(event.addMessage, message);
  }

  socket.emit(event.isOnlineMiguel, Boolean(miguel));

  socket.on(event.addMessage, (data) => {
    const message: Message = { room: id, writeBy: id, data };

    socket.nsp.to(id).emit(event.addMessage, message);
  });

  /**
   * Save guest id
   */
  guests.add(id);

  socket.on("disconnect", () => {
    guests.delete(id);

    if (!miguel) return;

    const message: Message = { room: id, writeBy: id, data: "disconnect" };

    miguel.emit(event.addMessage, message);
  });
}

export function authorize(isToken: IsToken) {
  return async function onAuthorize(socket: Socket, next: Next) {
    const guest = socket.handshake.auth[GUEST];

    const token = socket.handshake.auth[TOKEN];

    if (!guest && !token) {
      return next(new Error("missing auth"));
    }

    if (guest) {
      connectGuest(socket, guest);
      return next();
    } else if (await isToken(token)) {
      connectMiguel(socket);
      return next();
    }

    next(new Error("fail auth"));
  };
}

export function setChat(io: ServerIO, isToken: IsToken) {
  const nsp = io.of(NAMESPACE);

  nsp.use(authorize(isToken));

  return nsp;
}

/**
 * Types
 */
type IsToken = (token: string) => Promise<boolean>;

type Next = Parameters<Parameters<Namespace["use"]>[0]>[1];

export type { ServerIO };
