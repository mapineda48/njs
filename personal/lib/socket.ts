import { event, HEADERTOKEN, ROOM_ID } from "../src/app/service";

import type { JWT } from "./token";
import type { State } from "./state";
import type { Server } from "socket.io";
import type { DataRoom, DataMessage } from "../src/app/service";

export function createSocket(state: State, jwt: JWT, io: Server) {
  const socketMain = {
    addMessageGuess(data: DataMessage) {
      const { id, message } = data;

      const guest = event.addMessage(id);

      io.emit(guest, message);
    },

    addMessageAdmin(data: DataMessage) {
      const token = jwt.getToken();

      const admin = event.addMessage(token);

      io.emit(admin, data);
    },

    addRoom(data: DataRoom) {
      const token = jwt.getToken();

      const admin = event.addRoom(token);

      io.emit(admin, data);
    },

    setOnlineAdmin() {
      const online = state.setOnline();

      io.emit(event.type.ONLINE, { online });
    },
  };

  /**
   * Handler Connection or Disconnection
   */
  io.on("connection", (socket) => {
    const isAdmin = socket.request.headers[HEADERTOKEN] === jwt.getToken();

    const id = socket.request.headers[ROOM_ID];

    if (id) {
      socketMain.addMessageAdmin({
        id,
        message: { content: "online" },
      });

      socket.on("disconnect", () => {
        state.removeRoom(id);

        socketMain.addMessageAdmin({
          id,
          message: { content: "offline" },
        });
      });
    } else if (isAdmin) {
      socket.on("disconnect", () => {
        io.emit(event.type.ONLINE, { online: state.setOnline(false) });
      });
    }
  });

  return socketMain;
}
