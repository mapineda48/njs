import { guestID } from "./axios";
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
  win.miguel = Object.fromEntries(
    Object.entries(e).map(([key, val]) => [key, win.dev[val]])
  );
}, 500);

function emit(event: string, ...args: any[]) {
  console.log({ event, args });

  switch (event) {
    case e.ADD_MESSAGE:
      win.dev[e.ADD_MESSAGE]({
        room: guestID,
        writeBy: guestID,
        data: args[0],
      });
      break;

    default:
    case e.GET_MESSAGES:
      const [page, cb] = args;

      console.log(cb);
      if (cb) {
        cb(null, getMessages());
      }
      //cb(null, getMessages());

      break;
  }
}

function getMessages(): Message[] {
  const res: Message[] = [];

  while (res.length < 20) {
    res.push({ writeBy: "miguel", room: guestID, data: "Hello There" });
  }

  return res;
}
