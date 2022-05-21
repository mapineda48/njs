import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "@frontend/components/Message";
import { AMOUNT_PAGE } from "@socket/type";

const slice = createSlice({
  name: "room",
  initialState: initState(),
  reducers: {
    loading({ data }: State, { payload }: LoadRoom) {
      const state = data[payload];

      if (!state) {
        return;
      }

      state.loading = true;
    },
    sync({ data }: State, { payload }: SyncRoom) {
      const state = data[payload];

      if (!state) {
        return;
      }

      state.sync = true;
      state.loading = false;
    },
    loadMessages({ data }: State, action: LoadMessages) {
      console.log({ action });

      const { room, messages } = action.payload;

      const state = data[room];

      if (!data) {
        //console.error({ missRoom: room });
        return;
      }

      state.canFetch = messages.length >= AMOUNT_PAGE;
      state.page++;
      state.loading = false;
      state.messages = [...state.messages, ...messages];
    },

    addMessage({ data }, { payload }: AddMessage) {
      const { room, message } = payload;

      const state = data[room];

      if (!state) {
        return;
      }

      state.messages = [message, ...state.messages];
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
export type LoadRoom = PayloadAction<string>;

export type SyncRoom = PayloadAction<string>;

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
