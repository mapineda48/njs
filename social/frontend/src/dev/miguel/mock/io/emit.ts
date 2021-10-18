import { MIGUEL } from "@socket/type";
import * as e from "@socket/event";
import { server } from "./server";
import { wait } from "../axios";

import type { Message } from "@socket/type";

const api = new Map();

api.set(e.SAVE_SUBSCRIPTION, (sub: any, cb: any) => {
  wait().then(() => {
    console.log("save sub");
    console.log(sub);

    cb(null);
  });
});

api.set(e.PUBLIC_KEY, (cb: any) => {
  wait().then(() => {
    cb(null, "foo public key");
  });
});

const rooms: string[] = [];

while (rooms.length < 25) {
  rooms.push(Date.now() + rooms.length + "");
}

api.set(e.ADD_MESSAGE, (data: any) => {
  const message: Message = { room: rooms[0], writeBy: MIGUEL, data };
  server.emit(e.ADD_MESSAGE, message);
});

api.set(e.ROOMS_AVAILABLE, (cb: any) => {
  wait("foo").then(() => {
    cb(null, rooms);

    const [id] = rooms;

    const messages: Message[] = [];

    while (messages.length < 10) {
      messages.push({
        room: id,
        writeBy: id,
        data: Date.now() + messages.length + "",
      });
    }

    messages.forEach((m, i) => {
      wait(m.data, i * 1000)
        .then(() => {
          server.emit(e.ADD_MESSAGE, m);
        })
        .catch(console.error);
    });
  });
});

export default function emit(this: any, e: string, ...args: any[]) {
  const cb = api.get(e);

  if (cb) {
    cb(...args);
  } else {
    server.emit(e, ...args);
  }

  return this;
}
