import * as key from "./key";

const storage =
  process.env.NODE_ENV === "development" ? sessionStorage : localStorage;

export const token = {
  get() {
    return storage.getItem(key.TOKEN);
  },
  set(val: string) {
    storage.setItem(key.TOKEN, val);
    return val;
  },

  clear() {
    storage.removeItem(key.TOKEN);
    return null;
  },
};
