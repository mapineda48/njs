import path from "path";

export function resoveMod(...paths: string[]) {
  return path.join(__dirname, "..", ...paths);
}
