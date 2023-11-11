import { sync } from "./src/util/models/sync";
import Storage from "./src/storage";
import { version } from "./package.json";

const isDev = process.env.NODE_ENV !== "production";

sync(isDev, version)
  .then(() => Storage.Init())
  .catch((err) => {
    throw err;
  });
