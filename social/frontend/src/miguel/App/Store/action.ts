import { actions as counter } from "./slice/counter";
import { actions as room } from "./slice/room";
import { actions as guest } from "./slice/guest";

export const action = {
  counter,
  room,
  guest,
};

export type Action = typeof action;
