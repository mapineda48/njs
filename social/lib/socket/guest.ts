import * as e from "./event";
import { ErrorNotExistMiguel, ErrorNotFoundGuest } from "../error/Error";
import { logError } from "../error/log";
import { AMOUNT_PAGE, Message, UnhandlerError } from "./type";

import type { Socket } from "socket.io";
import type { Model } from "../model";

const USER_AGENT = "user-agent";

export function connectGuest(socket: Socket, model: Model, id: string) {
  model.seq
    .transaction()
    .then(async (transaction) => {
      const guest = await model.guest.findOne({ where: { id }, transaction });

      if (!guest) {
        throw new ErrorNotFoundGuest();
      }

      const miguel = await model.miguel.findOne({ transaction });

      if (!miguel) {
        throw new ErrorNotExistMiguel();
      }

      const miguelRoom = miguel.getDataValue("id");

      await guest.update(
        {
          isOnline: true,
          address: socket.request.connection.remoteAddress || "Unknown",
          userAgent: socket.request.headers[USER_AGENT],
          sockets: [...guest.getDataValue("sockets"), socket.id],
        },
        { transaction }
      );

      await transaction.commit();

      const { nsp } = socket;

      const guestID = guest.getDataValue("id");

      socket.join(guestID);

      const room = nsp.to(guestID);

      nsp.to(miguelRoom).emit(e.GUEST_ONLINE, guestID, true);

      socket.on(e.GUEST_ORIGIN, (origin: string, demo: string) => {
        guest
          .update({
            origin,
            demo,
          })
          .catch(logError);
      });

      socket.on(e.ADD_MESSAGE, (data: string) => {
        model.message
          .create({ room: guestID, writeBy: guestID, data })
          .then((message) => {
            room.emit(e.ADD_MESSAGE, message);
          })
          .catch(logError);
      });

      socket.on(e.APP_NOFIFY, (data: string) => {
        const message: Message = { room: guestID, writeBy: guestID, data };

        nsp.to(miguelRoom).emit(e.ADD_MESSAGE, message);
      });

      socket.on(e.GET_MESSAGES, (page: number, cb) => {
        const offset = AMOUNT_PAGE * (page - 1);

        model.message
          .findAll({
            order: [["createdAt", "DESC"]],
            where: {
              room: guestID,
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

      socket.on(e.DISCONNECT, () => {
        model.seq
          .transaction()
          .then(async (transaction) => {
            await guest.reload({ transaction });

            const sockets = guest
              .getDataValue("sockets")
              .filter((id) => id !== socket.id);

            const isOnline = Boolean(sockets.length);

            await guest.update(
              {
                isOnline,
                sockets,
              },
              { transaction }
            );

            await transaction.commit();

            if (isOnline) {
              return;
            }

            nsp.to(miguelRoom).emit(e.GUEST_ONLINE, guestID, isOnline);
          })
          .catch(logError);
      });
    })
    .catch(logError);
}
