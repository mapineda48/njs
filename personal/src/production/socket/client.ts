import { io } from "socket.io-client";
import { event, ROOM_ID, HEADERTOKEN } from "..";

import type { Chat } from "../../chat/state";
import type { Admin } from "../../admin/state";
import type { Message, PostMessage, ResOnline, PostRoom } from "..";

export const socket = {
  guess(chat: Chat, id: string) {
    const socket = io({
      extraHeaders: {
        [ROOM_ID]: id,
      },
    });

    const idEvent = event.addMessage(id);

    socket.on(idEvent, (message: Message) => chat.addMessage(message));

    socket.on(event.type.ONLINE, (data: ResOnline) => {
      chat.setOnline(data);
    });

    return socket;
  },
  admin(admin: Admin, token: string) {
    /**
     * When socket dispacth disconnect event to the server, it should be set offline admin.
     * https://socket.io/docs/v3/client-initialization/#extraHeaders
     */
    const socket = io({
      extraHeaders: {
        [HEADERTOKEN]: token,
      },
    });

    const idEvent = event.addMessage(token);

    socket.on(idEvent, (data: PostMessage) => admin.addMessage(data));

    socket.on(event.addRoom(token), (data: PostRoom) =>
      admin.addRoom(data.room)
    );

    return socket;
  },
};

export default socket;

/**
 * Types
 */

export type Socket = typeof socket;
