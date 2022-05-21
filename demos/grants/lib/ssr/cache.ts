import fs from "fs-extra";
import { resolve } from "../paths";

/**
 * Before they crucify me on how it handles cache,
 * I'm sure I must find a better way to do it.
 */

export const cache = "frontend/build/state";

const MAX_FILES = 10;

export async function isOverload() {
  const exists = await fs.pathExists(cache);

  if (!exists) return false;

  const files = await fs.readdir(cache);

  return files.length > MAX_FILES;
}

export async function save(state: any) {
  const id = "" + Date.now();

  const file = resolve(cache, `${id}.json`);

  await fs.outputJSON(file, state);

  return id;
}

export function clean(state?: string) {
  if (!state) {
    return fs.remove(resolve(cache)).catch(console.error);
  }

  const file = resolve(cache, state);

  return fs.remove(file).catch(console.error);
}
