import { NAMESPACE, GUEST, TOKEN, MIGUEL } from "./type";
import * as e from "./event";
import { prepareToSend } from "../web-push";

import type { VapidKeys, PushSubscription } from "web-push";
import type { Namespace, Server, Server as ServerIO, Socket } from "socket.io";
import type { Message } from "./type";
import type { Store } from "../store";
import type { Auth } from "../auth";
import ms from "ms";

export function connectMiguel(socket: Socket, store: Store, auth: Auth) {
  const { id, nsp } = socket;

  socket.on(e.MIGUEL_READY, () => {
    nsp.emit(e.MIGUEL_ONLINE, id);
  });

  /**
   * Guests report to Miguel with this event
   */
  socket.on(e.GUEST_ONLINE, (guest: string) => {
    if (socket.rooms.has(guest)) return;
    socket.join(guest);

    const message: Message = {
      room: guest,
      writeBy: guest,
      data: "connect",
    };

    socket.emit(e.ADD_MESSAGE, message);

    socket.to(guest).emit(e.MIGUEL_ONLINE, id);
  });

  /**
   * Get publicKey to create worker on client that enabled notification when miguel have a guest
   */
  socket.on(e.PUBLIC_KEY, async (cb) => {
    try {
      const vapidKeys = await store.map.get<VapidKeys>("vapidKeys");

      if (!vapidKeys) {
        cb({ message: "not found vapidKeys" });

        return;
      }

      cb(null, vapidKeys.publicKey);
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
      await store.subscription.insert(sub);

      cb(null);
    } catch (error) {
      cb({ message: "unhandler error " });

      console.error(error);
    }
  });

  socket.on(e.REMOVE_SUBSCRIPTION, async (sub: PushSubscription, cb) => {
    try {
      await store.subscription.delete(sub);

      cb(null);
    } catch (error) {
      cb({ message: "unhandler error " });

      console.error(error);
    }
  });

  socket.on(e.ADD_MESSAGE, (room: string, data: string) => {
    if (data === "/open") {
      nsp.to(room).emit(e.FORCE_OPEN);
      return;
    }

    const message: Message = { room, writeBy: MIGUEL, data };

    nsp.to(room).emit(e.ADD_MESSAGE, message);
  });

  socket.on("disconnect", () => {
    nsp.emit(e.MIGUEL_ONLINE, "");

    auth.logout().catch(console.error);
  });
}

function connectGuest(socket: Socket, foo: string, store: Store) {
  const { id, nsp } = socket;

  socket.join(id);

  nsp.emit(e.GUEST_ONLINE, id);

  const timeOut = setTimeout(() => {
    const sendNotify = prepareToSend(store);

    sendNotify({
      title: "Tienes un visitante",
      body: "Saludalo",
    });
  }, ms("5s"));

  /**
   * The socket on the client receives the event from Miguel
   * is online, Notify Miguel of the presence of this guest.
   */
  socket.on(e.MIGUEL_ONLINE, (miguel: string) => {
    nsp.to(miguel).emit(e.GUEST_ONLINE, id);

    clearTimeout(timeOut);
  });

  socket.on(e.ADD_MESSAGE, (data: string) => {
    const message: Message = { room: id, writeBy: id, data };

    nsp.to(id).emit(e.ADD_MESSAGE, message);
  });

  socket.on(e.APP_NOFIFY, (miguel: string, data: string) => {
    const message: Message = { room: id, writeBy: id, data };

    nsp.to(miguel).emit(e.ADD_MESSAGE, message);
  });

  socket.on("disconnect", () => {
    const message: Message = { room: id, writeBy: id, data: "disconnect" };

    nsp.to(id).emit(e.ADD_MESSAGE, message);
  });
}

export function authorize(store: Store, auth: Auth) {
  return async function onAuthorize(socket: Socket, next: Next) {
    const guest = socket.handshake.auth[GUEST];

    const token = socket.handshake.auth[TOKEN];

    if (!guest && !token) {
      return next(new Error("missing auth"));
    }

    if (guest) {
      connectGuest(socket, guest, store);
      return next();
    } else if (await auth.isToken(token)) {
      connectMiguel(socket, store, auth);
      return next();
    }

    next(new Error("fail auth"));
  };
}

export function setChat(options: Opt) {
  const { io, store, auth } = options;

  const nsp = io.of(NAMESPACE);

  nsp.use(authorize(store, auth));

  return nsp;
}

/**
 * Types
 */
export interface Opt {
  io: Server;
  store: Store;
  auth: Auth;
}

type Next = Parameters<Parameters<Namespace["use"]>[0]>[1];

export type { ServerIO };
