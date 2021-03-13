export function createState() {
  let online = false;
  let guests: string[] = [];

  return {
    setOnline(state = true) {
      online = state;

      return state;
    },

    getOnline() {
      return online;
    },

    addRoom(id: string) {
      guests = [...guests, id];
    },

    removeRoom(id: string) {
      guests = guests.filter((val) => val !== id);
    },
    getRooms() {
      return guests;
    },
    existsRoom(id: string) {
      return guests.includes(id);
    },
  };
}

/**
 * Types
 */
export type State = ReturnType<typeof createState>;
