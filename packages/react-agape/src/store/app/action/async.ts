import { management, invoice } from "../../action";
import { invoice as typeI } from "../../type";
import { goDashboard, goInvoice } from "./sync";

import agape from "../../../http";

import { ThunkAction } from "store/middleware/thunk";

export const logIn = (username: string, password: string): ThunkAction => {
  return async (dispatch, getState) => {
    const { token, employee } = await agape.login(username, password);

    dispatch(goDashboard(token, employee));
  };
};

export const gooInvoice = (): ThunkAction => {
  return async (dispatch, getState) => {
    const state = getState();

    const products = state.management.products;

    const isDisabled = state.invoice.view.current === typeI.view.DISABLED;

    dispatch(goInvoice());

    if (products.length > 0) {
      if (isDisabled) {
        dispatch(invoice.go(typeI.view.OPEN));
      }
      return;
    }

    dispatch(
      invoice.notify({
        view: typeI.view.LOADER,
        message: "Cargando productos...",
      })
    );

    try {
      const token = state.app.token;

      const result = await agape.select(token, "product", { column: "*" });

      dispatch(management.setProducts(result));

      dispatch(invoice.go(typeI.view.OPEN));
    } catch (error) {
      console.error(error);
      dispatch(
        invoice.notify({
          view: typeI.view.FATAL,
          message: error.message || "Error Desconocido",
        })
      );
    }
  };
};
