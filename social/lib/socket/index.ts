import { NAMESPACE, AUTH_GUEST, AUTH_MIGUEL } from "./type";
import { connectGuest } from "./guest";
import { connectMiguel } from "./miguel";

import type { Server as ServerIO, Namespace } from "socket.io";
import type { Model } from "../model";
import type { JWT } from "../jwt";

export default function setSocketSocial(io: ServerIO, jwt: JWT, model: Model) {
  const nsp = io.of(NAMESPACE);

  nsp.use(function onConnect(socket, next) {
    const guest = socket.handshake.auth[AUTH_GUEST];

    const token = socket.handshake.auth[AUTH_MIGUEL];

    if (guest) {
      connectGuest(socket,model, guest);
      next();
    } else if (token) {
      jwt
        .verify(token)
        .then((isMiguel) => {
          if (isMiguel) {
            connectMiguel(socket, model);
            next();
          }
        })
        .catch((err) => {
          console.error(err);
          next(new Error("unhandler error"));
        });
    } else {
      return next(new Error("unathorized"));
    }
  });

  return nsp;
}

/**
 * Types
 */
type Next = Parameters<Parameters<Namespace["use"]>[0]>[1];
