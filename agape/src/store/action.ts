import { action as app } from "./app";
import { action as invoice } from "./invoice";
import { action as management } from "./management";
import { ThunkAction } from "./middleware/thunk";

export const endSession = (): ThunkAction<void> => {
  return (dispatch, getState) => {
    dispatch(invoice.reset());
    dispatch(management.reset());
    dispatch(app.reset());
    dispatch(app.endRoot());
  };
};

export { app, invoice, management };

/**
 * Typings
 */

export type Action = app.Action | invoice.Action | management.Action;
