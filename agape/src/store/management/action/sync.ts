import * as type from "../type";

import { Updated, Table, Record } from "../state";
import { Results as MResults, Product } from "shared";

export const init = () => {
  return {
    type: type.action.INIT,
  } as const;
};

export const reset = () => {
  return {
    type: type.action.RESET,
  } as const;
};

export const search = () => {
  return {
    type: type.view.SEARCH,
  } as const;
};

export const notify = (message: string) => {
  return {
    type: type.notification.NOTIFICATE,
    message,
  } as const;
};

export const create = () => {
  return {
    type: type.view.CREATE,
  } as const;
};

export const edit = (record: Record) => {
  return {
    type: type.view.EDIT,
    record,
  } as const;
};

export const endView = () => {
  return {
    type: type.action.END_TASK,
  } as const;
};

export const finish = (message: string) => {
  return {
    type: type.notification.FINISH,
    message,
  } as const;
};

export const confirm = (message: string) => {
  return {
    type: type.notification.CONFIRM,
    message,
  } as const;
};

export const loading = (message: string) => {
  return {
    type: type.notification.LOADING,
    message,
  } as const;
};

export const goResults = (results: MResults<Table>) => {
  return {
    type: type.view.RESULTS,
    results,
  } as const;
};

export const setResults = (results: MResults<Table>) => {
  return {
    type: type.action.SET_RESULTS,
    results,
  } as const;
};

export const setProducts = (products: Product[]) => {
  return {
    type: type.action.SET_PRODUCTS,
    products,
  } as const;
};

export const back = () => {
  return {
    type: type.action.BACK,
  } as const;
};

export const resetHistory = () => {
  return {
    type: type.action.RESET_HISTORY,
  } as const;
};

export const updateTable = (table: string) => {
  return {
    type: type.action.UPDATE_TABLE,
    table,
  } as const;
};

export const endTable = () => {
  return {
    type: type.action.END_TABLE,
  } as const;
};

export const endCollapsible = () => {
  return {
    type: type.action.END_COLLAPSIBLE,
  } as const;
};

export const update = <T extends Table = Table>(updated: Updated<T>) => {
  return {
    type: type.action.UPDATE,
    updated,
  } as const;
};

export const toggleEdit = () => {
  return { type: type.action.TOGGLE_EDIT } as const;
};

export const endEdit = () => {
  return { type: type.action.END_EDIT } as const;
};

export const toggleDelete = () => {
  return { type: type.action.TOGGLE_DELETE } as const;
};

export const endDelete = () => {
  return { type: type.action.END_DELETE } as const;
};

export const toggleReadOnly = () => {
  return { type: type.action.TOGGLE_READONLY } as const;
};

export const removeTool = () => {
  return { type: type.action.REMOVE_TOOL } as const;
};
