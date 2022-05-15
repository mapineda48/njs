import { miguelID } from "./axios";
import * as e from "@socket/event";

import type { Message } from "@socket/type";

const win: any = window;

win.dev = {};

const socket = {
  on(event: string, ...args: any[]) {
    console.log({ type: "on", event, args });

    win.dev[event] = args[0];
  },
  emit,
};

export default function mockIo() {
  return socket;
}

setTimeout(() => {
  win.guest = Object.fromEntries(
    Object.entries(e).map(([key, val]) => [key, win.dev[val]])
  );
}, 500);

function emit(event: string, ...args: any[]) {
  console.log({ event, args });

  switch (event) {
    case e.ADD_MESSAGE:
      win.dev[e.ADD_MESSAGE]({
        room: miguelID,
        writeBy: miguelID,
        data: args[0],
      });
      break;
    case e.GET_MESSAGES:
      const [page, cb] = args;

      console.log(cb);
      if (cb) {
        cb(null, getMessages());
      }
      //cb(null, getMessages());

      break;
    default:
      break;
  }
}

function getMessages(): Message[] {
  const res: Message[] = [];

  while (res.length < 20) {
    res.push({ writeBy: "miguel", room: miguelID, data: "Hello There" });
  }

  return res;
}
