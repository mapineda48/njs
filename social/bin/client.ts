import createDebug from "debug";
import { createGuest as createSocket, opt } from "../src/socket/guest";
import { createSocket as createSockMiguel, prod } from "../src/socket/miguel";
import * as http from "../src/http";
import { event as _event, NAMESPACE } from "../src/socket/type";

import type { Socket } from "socket.io-client";

http.prod.url = "http://localhost:3000/social/miguel/";

prod.url = `http://localhost:3000${NAMESPACE}`;

const guestMap = new Map<string, MapValue>();

let miguel: Miguel | null = null;

process.stdin.on("data", (buff) => {
  const data = buff.toString().replace("\n", "");
  main(data);
});

/**
 * Create guess socket
 */

function main(arg: string) {
  const [who, event, ...rest] = arg.split(" ");

  if (who === "miguel") {
    actionMiguel(event, rest);
  } else {
    actionGuest(who, event, rest);
  }
}

function actionMiguel(event: string, [name, ...args]: string[]) {
  if (event === "connect") {
    createMiguel()
      .then((res) => {
        miguel = res;
      })
      .catch(console.error);

    return;
  }

  if (!miguel) return;

  switch (event) {
    case _event.addMessage: {
      const { id } = getGuest(name);

      if (!id) return;

      miguel.addMessage(id);

      break;
    }

    case _event.roomsAvailable: {
      miguel.fetchRooms().then(console.log).catch(console.error);

      break;
    }

    case "disconnect": {
      miguel.socket.disconnect();
      miguel.socket.close();
      miguel = null;
      break;
    }

    default:
      break;
  }
}

async function createMiguel() {
  const { token } = await http.client.login("foo", "12345");

  console.log(`create miguel with token: ${token}`);

  const miguel = createSockMiguel(token);

  const log = createLog("miguel", miguel.socket);

  log.state().onEvent(_event.addMessage, _event.roomsAvailable);

  return miguel;
}

function actionGuest(name: string, event: string, args: string[]) {
  if (event === "connect") {
    return createGuest(name);
  } else if (event === "disconnect") {
    return disconnectGuest(name);
  }

  const { instance } = getGuest(name);

  if (!instance) return;

  (instance as any)[event](...args);
}

function createGuest(name: string) {
  const { id } = guestMap.get(name) ?? initGuest();

  const instance = createSocket();

  const log = createLog(`guest-${name}`, instance.socket);

  log.debug(`id: ${id}`);

  log.state().onEvent(_event.isOnlineMiguel, _event.addMessage);

  guestMap.set(name, { id, instance });

  return instance;
}

function disconnectGuest(name: string) {
  const { id, instance } = getGuest(name);

  if (instance) {
    instance.socket.disconnect();
    instance.socket.close();
  }

  guestMap.set(name, { id, instance: null });
}

function getGuest(name: string) {
  const current = guestMap.get(name);

  if (!current) {
    throw new Error("not found guest");
  }

  return current;
}

function initGuest(): MapValue {
  const id = Date.now() + "";

  return { id, instance: null };
}

export function createLog(name: string, socket: Socket) {
  const debug = createDebug(name);

  const _emit = socket.emit;

  socket.emit = function emit(event, ...args) {
    debug(`emit: "${event}"`);

    args.forEach((arg) => {
      debug(arg);
    });

    return _emit.call(socket, event, ...args);
  };

  const util = {
    debug,
    onEvent(...events: string[]) {
      events.forEach((event) => {
        socket.on(event, function onEvent(...args: any[]) {
          debug(`received "${event}"`);
          args.forEach((arg) => {
            debug(arg);
          });
        });
      });

      return util;
    },

    state() {
      socket.on("connect", () => {
        debug("connect");
        socket.on("disconnect", (reason) => {
          debug(`disconnect: ${reason}`);
        });
      });

      const errors = [
        "error",
        "connect_error",
        "reconnect_error",
        "reconnect_failed",
      ];

      errors.forEach((event) => {
        socket.on(event, (data) => {
          debug(`${event}: ${data.message}`);
        });
      });

      return util;
    },
  };

  return util;
}

/**
 * Types
 */
interface MapValue {
  id: string;
  instance: Guest | null;
}

type Guest = ReturnType<typeof createGuest>;

type Miguel = ReturnType<typeof createMiguel> extends Promise<infer T>
  ? T
  : never;
