import { existsToken, login as loginApi } from "./api";
import { createSocket } from "./socket";

export async function login(username: string, password: string) {
  const token = await loginApi(username, password);

  return createSocket(token);
}

export async function existsSession() {
  const token = await existsToken();

  if (!token) {
    return null;
  }

  return createSocket(token);
}

/**
 * Types
 */
export type Session = ReturnType<typeof login> extends Promise<infer R>
  ? R
  : never;
