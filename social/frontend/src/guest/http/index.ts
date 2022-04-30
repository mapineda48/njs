import { getGuestID } from "./api";
import { createSocket } from "./socket";

export async function createSession() {
  const id = await getGuestID();

  return createSocket(id);
}

/**
 * Types
 */
export type Session = ReturnType<typeof createSession> extends Promise<infer R>
  ? R
  : never;
