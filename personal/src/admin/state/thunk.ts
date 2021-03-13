import http from "service/http";

import type { Admin } from ".";
import type { PostMessage } from "service";

export async function addMessage(admin: Admin, data: PostMessage) {
  try {
    await http.addMessage(data);
  } catch (error) {
    console.log(error);
    admin.addMessage({
      id: data.id,
      message: {
        writeByMiguel: true,
        content: "Fallo envio del mensaje.",
      },
    });
  }
}

export async function fetchRooms(admin: Admin) {
  try {
    const state = await admin.getState();

    const rooms = await http.getGuests(state.token);

    rooms.forEach((room) => {
      admin.addRoom(room);
    });
  } catch (error) {}
}
