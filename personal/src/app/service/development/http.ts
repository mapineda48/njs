import { api, event, FORCE_OPEN } from "..";

import { server, token } from "./socket";

import type { Http } from "../http/client";

const rejs: string[] = [];

async function wait(url: string, time = 1000) {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      if (!rejs.includes(url)) return res();

      const err = new Error("im a bad error");

      rej(err);
    }, time);
  });
}

export const client: Http = {
  async getRooms(token) {
    await wait(api.getRooms);

    return [
      { id: "foo", pathname: "/foo" },
      { id: "bar", pathname: "/bar" },
    ];
  },

  async login(username, password) {
    await wait(api.login);

    return { token };
  },

  async addMessage(data) {
    await wait(api.addMessage);

    const id = data.id.toString();

    const idEvent = event.addMessage(id);

    server.emit(idEvent, data.message);

    if (data.message.content === FORCE_OPEN) return;

    const idAdmin = event.addMessage(token);

    server.emit(idAdmin, data);
  },

  async addRoom(data) {
    await wait(api.online);

    server.emit(event.addRoom(token), data);

    return { online: true };
  },
};
