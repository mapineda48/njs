import type { DataRoom } from "../src/app/service";

export function createState() {
  let online = false;
  const room: Room = new Map();

  return {
    setOnline(state = true) {
      online = state;
      return state;
    },

    getOnline() {
      return online;
    },

    addRoom(data: DataRoom) {
      room.set(data.id, data);
    },

    removeRoom(id: string) {
      room.delete(id);
    },
    getRooms() {
      return Array.from(room.values());
    },
    existsRoom(id: string) {
      return room.has(id);
    },
  };
}

/**
 * Types
 */
type Room = Map<string, DataRoom>;

export type State = ReturnType<typeof createState>;
