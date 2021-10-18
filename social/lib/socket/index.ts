import { NAMESPACE, GUEST, TOKEN, MIGUEL } from "./type";
import * as e from "./event";
import * as auth from "../auth";
import { prepareToSend } from "../web-push";

import type { PushSubscription } from "web-push";
import type { Namespace, Server, Server as ServerIO, Socket } from "socket.io";
import type { Message } from "./type";
import type { Store } from "../store";

/**
 * We store the IDs of the clients so that when Miguel
 * is online to notify him.
 */
const guests = new Set<string>();

/**
 * Miguel's socket reference
 */
let miguel: Socket | null = null;

export function connectMiguel(socket: Socket, store: Store) {
  miguel = socket;

  /**
   * Send rooms to client
   */
  socket.on(e.ROOMS_AVAILABLE, (cb) => {
    const rooms = getGuestsAvailable();

    /**
     * Join all rooms available
     */
    socket.join(rooms);

    socket.to(rooms).emit(e.MIGUEL_ONLINE, true);

    cb(null, rooms);
  });

  /**
   * Get publicKey to create worker on client that enabled notification when miguel have a guest
   */
  socket.on(e.PUBLIC_KEY, async (cb) => {
    try {
      const { publicKey } = await store.getVapidKeys();

      cb(null, publicKey);
    } catch (error) {
      cb({ message: "unhandler error " });

      console.error(error);
    }
  });

  /**
   * Save subscription
   */
  socket.on(e.SAVE_SUBSCRIPTION, async (sub: PushSubscription, cb) => {
    try {
      await store.saveSubscription(sub);

      cb(null);
    } catch (error) {
      cb({ message: "unhandler error " });

      console.error(error);
    }
  });

  socket.on(e.REMOVE_SUBSCRIPTION, async (sub: PushSubscription, cb) => {
    try {
      await store.removeSubscription(sub);

      cb(null);
    } catch (error) {
      cb({ message: "unhandler error " });

      console.error(error);
    }
  });

  socket.on(e.ADD_MESSAGE, (room: string, data: string) => {
    if (data === "/open") {
      socket.nsp.to(room).emit(e.FORCE_OPEN);
      return;
    }

    const message: Message = { room, writeBy: MIGUEL, data };

    socket.nsp.to(room).emit(e.ADD_MESSAGE, message);
  });

  socket.on("disconnect", () => {
    miguel = null;

    const rooms = getGuestsAvailable();

    socket.to(rooms).emit(e.MIGUEL_ONLINE, false);

    auth.logout();
  });
}

export function getGuestsAvailable() {
  return Array.from(guests);
}

function connectGuest(socket: Socket, id: string, store: Store) {
  const sendNotify = prepareToSend(store);

  socket.join(id);

  socket.nsp.emit(e.GUEST_ONLINE);

  if (miguel) {
    miguel.join(id);

    const message: Message = { room: id, writeBy: id, data: "connect" };

    miguel.emit(e.ADD_MESSAGE, message);
  } else {
    /**
     * Notify to miguel guest connect
     */
    sendNotify({
      title: "Tienes un visitante",
      body: "Saludalo",
    });
  }

  socket.emit(e.MIGUEL_ONLINE, Boolean(miguel));

  socket.on(e.ADD_MESSAGE, (data) => {
    const message: Message = { room: id, writeBy: id, data };

    socket.nsp.to(id).emit(e.ADD_MESSAGE, message);
  });

  socket.on(e.GUEST_APP_NOFIFY, (data: string) => {
    if (!miguel) return;

    const message: Message = { room: id, writeBy: id, data };

    miguel.emit(e.ADD_MESSAGE, message);
  });

  /**
   * Save guest id
   */
  guests.add(id);

  socket.on("disconnect", () => {
    guests.delete(id);

    if (!miguel) return;

    const message: Message = { room: id, writeBy: id, data: "disconnect" };

    miguel.emit(e.ADD_MESSAGE, message);
  });
}

export function authorize(store: Store) {
  return async function onAuthorize(socket: Socket, next: Next) {
    const guest = socket.handshake.auth[GUEST];

    const token = socket.handshake.auth[TOKEN];

    if (!guest && !token) {
      return next(new Error("missing auth"));
    }

    if (guest) {
      connectGuest(socket, guest, store);
      return next();
    } else if (auth.isToken(token)) {
      connectMiguel(socket, store);
      return next();
    }

    next(new Error("fail auth"));
  };
}

export function setChat(io: Server, store: Store) {
  const nsp = io.of(NAMESPACE);

  nsp.use(authorize(store));

  return nsp;
}

/**
 * Types
 */
type Next = Parameters<Parameters<Namespace["use"]>[0]>[1];

export type { ServerIO };
