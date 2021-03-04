import * as type from "../type";
import { addClient, go, addSupplier, notify } from "./sync";

import agape from "../../../http";

import { ThunkAction } from "../../middleware/thunk";

export const fetchClient = (dni: string): ThunkAction => {
  return async (dispatch, getState) => {
    const token = getState().app.token;

    const [result] = await agape.select(token, "client", {
      where: { column: "dni", value: dni },
    });

    if (!result) {
      throw new Error("not found client");
    }

    dispatch(addClient(result));

    dispatch(go(type.view.DETAIL));
  };
};

export const fetchSupplier = (dni: string): ThunkAction => {
  return async (dispatch, getState) => {
    const token = getState().app.token;

    const [result] = await agape.select(token, "supplier", {
      where: { column: "dni", value: dni },
    });

    if (!result) {
      throw new Error("not found supplier");
    }

    dispatch(addSupplier(result));

    dispatch(go(type.view.DETAIL));
  };
};

export const create = (): ThunkAction => {
  return async (dispatch, getState) => {
    const dni = getState().app.employee.dni;

    const token = getState().app.token;

    const invoice = getState().invoice;

    const newInvoice = {
      cod: invoice.cod,
      dniEmployee: dni,
      date: Date.now(),
      details: invoice.details,
      comment: "",
      subTotal: invoice.subTotal,
      iva: invoice.iva,
    };

    try {
      if (invoice.client) {
        dispatch(
          notify({
            view: type.view.LOADER,
            message: "Registrado Venta",
          })
        );

        const data = {
          ...newInvoice,
          dniClient: invoice.client.dni,
        };

        await agape.insert(token, "sell", data);

        dispatch(
          notify({
            view: type.view.SUCCES,
            message: "Venta Registrada",
          })
        );

        return;
      }

      if (invoice.supplier) {
        dispatch(
          notify({
            view: type.view.LOADER,
            message: "Registrando Compra",
          })
        );

        const data = {
          ...newInvoice,
          dniSupplier: invoice.supplier.dni,
        };

        await agape.insert(token, "buy", data);

        dispatch(
          notify({
            view: type.view.SUCCES,
            message: "Compra Registrada",
          })
        );

        return;
      }

      throw new Error("Error Inesperado");
    } catch (error) {
      console.log(error);

      dispatch(
        notify({
          view: type.view.ERROR,
          message: error.message || "Error Desconocido",
        })
      );
    }
  };
};
