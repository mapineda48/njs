import { api, event, State } from "../shared";
import { socket } from "./socket";
import type { Admin } from "../http";

const rejects: string[] = [];

function reject(url: string) {
  for (let index = 0; index < rejects.length; index++) {
    const api = rejects[index];
    if (url.startsWith(api)) {
      return new Error("Im a error");
    }
  }
}

async function wait(url: string, time = 1000) {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      const err = reject(url);
      if (err) return rej(err);
      res();
    }, time);
  });
}

let serverState: State = {
  maps: true,
};

export const mock: Admin = {
  async setMaps(state) {
    await wait(api);
    serverState = { ...serverState, maps: state };

    socket.emit(event.change, { ...serverState });
  },
  async fetchState() {
    await wait(api);

    return { ...serverState };
  },
};
