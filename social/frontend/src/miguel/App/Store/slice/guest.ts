import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AMOUNT_PAGE } from "@socket/type";
import type { Guest as Model } from "@model/Guest";

export const slice = createSlice({
  name: "guest",
  initialState: init(),
  reducers: {
    addRecords(state, { payload }: SyncGuests) {
      state.loading = false;
      state.canFetch = payload.length >= AMOUNT_PAGE;
      state.page++;
      state.records = [...state.records, ...payload];
    },

    syncRecords(state, { payload }: AddGuests) {
      state.sync = true;
      state.loading = false;
      state.canFetch = payload.length >= AMOUNT_PAGE;
      state.page++;
      state.records = [...state.records, ...payload];
    },
    loading(state) {
      state.loading = true;
    },
  },
});

export const { actions } = slice;

export default slice.reducer;

export function init(): State {
  return {
    sync: false,
    canFetch: true,
    loading: false,
    page: 1,
    records: [],
  };
}

/**
 * Types
 */
type SyncGuests = PayloadAction<Model[]>;

type AddGuests = PayloadAction<Model[]>;

interface State {
  sync: boolean;
  canFetch: boolean;
  loading: boolean;
  page: number;
  records: Model[];
}
