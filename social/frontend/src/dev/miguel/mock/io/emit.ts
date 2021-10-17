import { event, MIGUEL } from "@socket";
import { server } from "./server";
import { wait } from "../axios";

import type { Message } from "@socket";

const api = new Map();

api.set(event.saveSubscription, (sub: any, cb: any) => {
  wait().then(() => {
    console.log("save sub");
    console.log(sub);

    cb(null);
  });
});

api.set(event.getPublicKey, (cb: any) => {
  wait().then(() => {
    cb(null, "foo public key");
  });
});

const rooms: string[] = [];

while (rooms.length < 25) {
  rooms.push(Date.now() + rooms.length + "");
}

api.set(event.addMessage, (data: any) => {
  const message: Message = { room: rooms[0], writeBy: MIGUEL, data };
  server.emit(event.addMessage, message);
});

api.set(event.roomsAvailable, (cb: any) => {
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
          server.emit(event.addMessage, m);
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
