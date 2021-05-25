import http from "app/service/http";

import type { Chat } from ".";
import type { DataMessage } from "app/service";

export async function addMessage(chat: Chat, data: DataMessage) {
  try {
    await http.addMessage(data);
  } catch (error) {
    chat.addMessage({ content: "No se pudo enviar el mensaje." });
    console.log(error);
  }
}

export async function addRoom(chat: Chat, id: string) {
  try {
    const data = await http.addRoom({ id, pathname: window.location.pathname });

    chat.setOnline(data);
  } catch (error) {
    console.log(error);
  }
}
