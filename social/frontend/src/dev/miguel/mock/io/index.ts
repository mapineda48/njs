import { server } from "./server";
import emit from "./emit";

export default function mockIO() {
  console.log("set mock io to miguel");

  return {
    disconnect() {
      server.pairs = {};
    },
    on(e: string, ...args: any[]) {
      server.on(e, ...args);
    },
    off(e: string, ...args: any[]) {
      server.off(e, ...args);
    },
    emit,
  };
}
