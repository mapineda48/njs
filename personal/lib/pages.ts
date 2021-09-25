import  path from "path";

export const pages = {
  notfound: resolve("frontend/build/.pages/not-found.html"),
  unauthorized: resolve("frontend/build/.pages/unauthorized.html"),
};

export function resolve(...args: string[]) {
  return path.join(__dirname, "..", ...args);
}
