import { Session } from "@frontend/miguel/http";
import { Dispatch } from "redux";
import type { Action } from "../action";
import { GetState } from "../store";

export default function create(session: Session, { room }: Action) {
  return {
    ...room,
    syncRoom(room: string) {
      return async (dispatch: Dispatch, getState: GetState) => {
        const state = getState()?.room?.data[room];

        if (!state || state.sync || state.loading) {
          return;
        }

        this.loading(room);

        const messages = await session.getMessages(room, state.page);

        this.sync(room);
        this.loadMessages({ room, messages });
      };
    },
    fetchMessages(room: string, page: number) {
      return async () => {
        this.loading(room);

        const messages = await session.getMessages(room, page);

        this.loadMessages({ room, messages });
      };
    },
  };
}
