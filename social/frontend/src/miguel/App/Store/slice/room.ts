import { IMessage } from "@frontend/components/Message";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AMOUNT_PAGE } from "@socket/type";

const slice = createSlice({
  name: "room",
  initialState: initState(),
  reducers: {
    loadMessages(state: State, action: LoadMessages) {
      const { room, messages } = action.payload;

      const data = state.data[room];

      if (!data) {
        //console.error({ missRoom: room });
        return;
      }

      data.canFetch = messages.length >= AMOUNT_PAGE;
      data.page++;
      data.loading = false;
      data.messages = [...messages, ...data.messages];
    },

    addMessage(state, { payload }: AddMessage) {
      const room = state.data[payload.room];

      if (!room) {
        return;
      }

      room.messages.push(payload.message);
    },

    removeRoom(state, { payload }: RemoveRoom) {
      if (!state.availables.includes(payload)) {
        return;
      }

      state.availables = state.availables.filter((room) => room !== payload);

      if (state.current === payload) {
        state.current = state.availables[0] ?? "";
      }

      delete state.data[payload];
    },

    addRooms(state, { payload }: AddRooms) {
      const rooms = payload.filter((room) => !state.availables.includes(room));

      if (!rooms.length) {
        return;
      }

      rooms.forEach((room) => {
        state.data[room] = initRoom();
      });

      state.availables.push(...rooms);

      if (!state.current) {
        state.current = state.availables[0];
      }
    },

    addRoom(state, { payload }: AddRoom) {
      if (state.data[payload]) {
        return;
      }

      state.data[payload] = initRoom();

      state.availables.push(payload);

      if (!state.current) {
        state.current = payload;
      }
    },

    setRoom(state, { payload }: SetRoom) {
      state.current = payload;
    },
  },
});

export function initState(): State {
  return { current: "", availables: [], data: {} };
}

export function initRoom(): Room {
  return { loading: false, sync: false, page: 1, canFetch: true, messages: [] };
}

export const { actions } = slice;

export default slice.reducer;

/**
 * Types
 */

export type LoadMessages = PayloadAction<{
  room: string;
  messages: IMessage[];
}>;

export type AddMessage = PayloadAction<{
  room: string;
  message: IMessage;
}>;

export type RemoveRoom = PayloadAction<string>;

export type AddRooms = PayloadAction<string[]>;

export type AddRoom = PayloadAction<string>;

export type SetRoom = PayloadAction<string>;

export interface State {
  current: string;
  availables: string[];
  data: {
    [K: string]: Room;
  };
}

export interface Room {
  loading: boolean;
  sync: boolean;
  messages: IMessage[];
  canFetch: boolean;
  page: number;
}
