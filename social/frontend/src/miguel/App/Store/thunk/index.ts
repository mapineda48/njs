import { Session } from "@frontend/miguel/http";
import { Action } from "../action";
import createRoom from "./room";
import createGuest from "./guest";

export default function create(session: Session, action: Action) {
  return {
    ...action,
    room: createRoom(session, action),
    guest: createGuest(session, action),
  };
}

/**
 * Types
 */

export type ActionThunk = ReturnType<typeof create>;
