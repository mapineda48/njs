import path from "path";

export function resolve(...paths: string[]) {
  return path.join(__dirname, "..", ...paths);
}
