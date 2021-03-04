import * as type from "../type";
import { animation as animtn } from "../../../component/Router/state";

import { Client, Supplier, Detail } from "shared";

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

export const addCod = (cod: string) => {
  return {
    type: type.action.ADD_COD,
    cod,
  } as const;
};

export const addClient = (client: Client) => {
  return {
    type: type.action.ADD_CLIENT,
    client,
  } as const;
};

export const addSupplier = (supplier: Supplier) => {
  return {
    type: type.action.ADD_SUPPLIER,
    supplier,
  } as const;
};

export const addDetail = (detail: Detail) => {
  return {
    type: type.action.ADD_DETAIL,
    detail,
  } as const;
};

export const removeDetail = (id: number) => {
  return {
    type: type.action.REMOVE_DETAIL,
    id,
  } as const;
};

export const setIsReadyDetail = () => {
  return {
    type: type.action.SET_IS_READY_DETAIL,
  } as const;
};

export const setIsPaid = () => {
  return {
    type: type.action.SET_IS_PAID,
  } as const;
};

export const setIsComplete = () => {
  return {
    type: type.action.SET_IS_COMPLETE,
  } as const;
};

export const notify = (value: Notify) => {
  return {
    ...value,
    type: type.action.NOTIFY,
  } as const;
};

export const go = (arg: ArgsGo) => {
  return {
    view: typeof arg === "function" ? arg(type.view) : arg,
    type: type.action.GO,
  } as const;
};

export const back = () => {
  return {
    type: type.action.BACK,
  } as const;
};

export const endView = () => {
  return {
    type: type.action.END_VIEW,
  } as const;
};

export const cancel = () => {
  return {
    type: type.action.CANCEL,
  } as const;
};

export const toggleInfo = () => {
  return { type: type.action.TOGGLE_INFO } as const;
};

export const endInfo = () => {
  return { type: type.action.END_INFO } as const;
};

/**
 * Typings
 */
type ArgsGo = ((view: type.IView) => type.View) | type.View;

interface Notify {
  view: type.View;
  message: string;
}
