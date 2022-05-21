import * as e from "./event";

import type { Socket } from "socket.io";
import type { PushSubscription } from "web-push";
import type { Model } from "../model";
import { ErrorNotExistMiguel } from "../error/Error";
import { logError } from "../error/log";
import { AMOUNT_PAGE, UnhandlerError } from "./type";

export function connectMiguel(socket: Socket, model: Model) {
  model.miguel
    .findOne()
    .then(async (miguel) => {
      if (!miguel) {
        throw new ErrorNotExistMiguel();
      }

      const guests = await model.guest.findAll({
        where: { isOnline: true },
      });

      const rooms = guests.map((guest) => guest.getDataValue("id"));

      return { miguel, rooms };
    })
    .then(({ miguel, rooms }) => {
      const miguelID = miguel.getDataValue("id");

      socket.join(miguelID);

      socket.join(rooms);

      const getCurrentRooms = () =>
        Array.from(socket.rooms).filter(
          (room) => room !== socket.id && room !== miguelID
        );

      const { nsp } = socket;

      socket.on(e.MIGUEL_READY, (cb) => {
        miguel
          .update({ isOnline: true })
          .then(() => {
            nsp.to(rooms).emit(e.MIGUEL_ONLINE, true);
            cb(null, getCurrentRooms());
          })
          .catch(logError);
      });

      /**
       * Guests report to Miguel with this event
       */
      socket.on(e.GUEST_ONLINE, (room: string, isOnline: boolean) => {
        model.miguel
          .findOne()
          .then((miguel) => {
            if (!miguel) {
              throw new ErrorNotExistMiguel();
            }

            const isReady = miguel.getDataValue("isOnline");

            if (!isOnline) {
              if (socket.rooms.has(room)) {
                socket.leave(room);
              }
              return;
            }

            if (!socket.rooms.has(room)) {
              socket.join(room);
            }

            if (!isReady) {
              return;
            }

            socket.to(room).emit(e.MIGUEL_ONLINE, true);
          })
          .catch(logError);
      });

      /**
       * Get publicKey to create worker on client that enabled notification when miguel have a guest
       */

      socket.on(e.PUBLIC_KEY, (cb) => {
        cb(null, miguel.getDataValue("publicKey"));
      });

      socket.on(e.GET_MESSAGES, (room: string, page: number, cb) => {
        const offset = AMOUNT_PAGE * (page - 1);

        model.message
          .findAll({
            order: [["createdAt", "DESC"]],
            where: {
              room,
            },
            limit: AMOUNT_PAGE,
            offset,
          })
          .then((res) => cb(null, res))
          .catch((err) => {
            cb(UnhandlerError);
            logError(err);
          });
      });

      socket.on(e.GET_GUESTS, (page: number, cb) => {
        const offset = AMOUNT_PAGE * (page - 1);

        model.guest
          .findAll({
            order: [["updatedAt", "DESC"]],
            limit: AMOUNT_PAGE,
            offset,
          })
          .then((res) => cb(null, res))
          .catch((err) => {
            cb(UnhandlerError);
            logError(err);
          });
      });

      /**
       * Save subscription
       */
      socket.on(e.SAVE_SUBSCRIPTION, (sub: PushSubscription, cb) => {
        model.subscription
          .create(sub)
          .then(cb)
          .catch((err) => {
            console.error(err);
            cb({ message: "unhandler error " });
          });
      });

      socket.on(e.REMOVE_SUBSCRIPTION, (sub: PushSubscription, cb) => {
        model.subscription
          .destroy({
            where: {
              endpoint: sub.endpoint,
            },
          })
          .then(() => cb())
          .catch((err) => {
            logError(err);
            cb({ message: "unhandler error " });
          });
      });

      socket.on(e.ADD_MESSAGE, (room: string, data: string) => {
        model.message
          .create({ room, writeBy: miguelID, data })
          .then((message) => {
            nsp.to(room).emit(e.ADD_MESSAGE, message);
          })
          .catch(console.error);
      });

      socket.on("disconnect", () => {
        miguel
          .update({ isOnline: false })
          .catch(logError)
          .finally(() => {
            nsp.to(getCurrentRooms()).emit(e.MIGUEL_ONLINE, false);
          });
      });
    })
    .catch(console.error);
}
