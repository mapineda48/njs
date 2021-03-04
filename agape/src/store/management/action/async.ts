import * as type from "../type";
import { loading, edit, goResults, notify, finish, setResults } from "./sync";
import { table } from "../../../http/idiom";
import client from "../../../http";

import { Option, Table } from "shared";
import { ThunkAction } from "../../middleware/thunk";

const { parseSpanish } = table;

export const get = (opt: Option<Table>): ThunkAction => {
  return async (dispatch, getState) => {
    dispatch(loading(""));

    const token = getState().app.token;

    const current = getState().management.table.current;

    const table = parseSpanish(current);

    try {
      const results: any[] = await client.select(token, table, opt);

      if (results.length < 1) {
        dispatch(notify("No existe el registro"));
        return;
      }

      if (results.length < 2) {
        dispatch(edit(results[0]));
        return;
      }

      dispatch(goResults(results));
    } catch (err) {
      console.log(err);
      dispatch(notify("Error Desconocido"));
    }
  };
};

export const put = (): ThunkAction => {
  return async (dispatch, getState) => {
    const state = getState();

    const record: any = state.management.record;

    if (!record) {
      return;
    }

    dispatch(loading(""));

    const token = state.app.token;

    const current = state.management.table.current;

    const table = parseSpanish(current);

    const id = record.id;

    try {
      await client.update(token, table, { id, input: record });
      dispatch(finish("Se ha editado correctamente"));
    } catch (err) {
      console.log(err);
      dispatch(notify("Unknow Error"));
    }
  };
};

export const post = (): ThunkAction => {
  return async (dispatch, getState) => {
    const state = getState();

    const record = state.management.record;

    if (!record) {
      return;
    }

    dispatch(loading(""));

    const token = state.app.token;

    const current = state.management.table.current;

    const table = parseSpanish(current);

    try {
      await client.insert(token, table, record);
      dispatch(finish("Se ha creado correctamente"));
    } catch (err) {
      console.log(err);
      dispatch(notify("Error Desconocido"));
    }
  };
};

export const remove = (): ThunkAction => {
  return async (dispatch, getState) => {
    const state = getState();

    const record: any = state.management.record?.current;

    if (!record) {
      return;
    }

    dispatch(loading(""));

    const token = state.app.token;

    const current = state.management.table.current;

    const table = parseSpanish(current);

    const id = record.id;

    try {
      await client.delete(token, table, id);
      dispatch(finish("Se ha eliminado correctamente"));
    } catch (err) {
      console.log(err);
      dispatch(notify("Error Desconocido"));
    }
  };
};

export const confirmTask = (): ThunkAction<void> => {
  return (dispatch, getState) => {
    const { readonly, create } = getState().management;

    if (create) {
      dispatch(post());
      return;
    }

    if (readonly) {
      dispatch(remove());
      return;
    }

    dispatch(put());
  };
};

export const fetchProducts = (): ThunkAction => {
  return async (dispatch, getState) => {
    const token = getState().app.token;

    return client
      .select(token, "product", { column: "*" })
      .then((results) => {
        dispatch(setResults(results));
      })
      .catch((err) => console.error(err));
  };
};
