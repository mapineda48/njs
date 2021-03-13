import { event, HEADERTOKEN, ROOM_ID } from "../src/production";

import type { JWT } from "./token";
import type { State } from "./state";
import type { Server } from "socket.io";
import type { PostRoom, PostMessage } from "../src/production";

export function createSocket(state: State, jwt: JWT, io: Server) {
  const socketMain = {
    addMessageGuess(data: PostMessage) {
      const { id, message } = data;

      const guest = event.addMessage(id);

      io.emit(guest, message);
    },

    addMessageAdmin(data: PostMessage) {
      const token = jwt.getToken();

      const admin = event.addMessage(token);

      io.emit(admin, data);
    },

    addRoom(data: PostRoom) {
      const token = jwt.getToken();

      const admin = event.addRoom(token);

      io.emit(admin, data);
    },

    setOnlineAdmin() {
      io.emit(event.type.ONLINE, { online: state.setOnline() });
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
