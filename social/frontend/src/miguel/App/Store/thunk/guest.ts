import { Session } from "@frontend/miguel/http";
import { Dispatch } from "redux";
import type { Action } from "../action";
import { GetState } from "../store";

export default function create(session: Session, { guest }: Action) {
  return {
    ...guest,
    sync() {
      return async (dispatch: Dispatch, getState: GetState) => {
        this.loading();

        const state = getState();

        const guests = await session.getGuest(state.guest.page);

        this.syncRecords(guests);
      };
    },

    fetchGuest() {
      return async (dispatch: Dispatch, getState: GetState) => {
        this.loading();

        const state = getState();

        const guests = await session.getGuest(state.guest.page);

        this.addRecords(guests);
      };
    },
  };
}
