import * as type from "./type";
import { router, animation } from "../../component/Router/state";

import { Client, Supplier, Detail } from "shared";

export const state: State = {
  type: type.action.INIT,
  cod: "",
  subTotal: 0,
  iva: 0,
  details: [],
  isReadyDetail: false,
  isPaid: false,
  isComplete: false,
  loader: "",
  view: router.create({
    current: type.view.DISABLED,
    disabled: { types: [type.view.DISABLED] },
    notification: {
      types: [
        type.view.DISABLED,
        type.view.LOADER,
        type.view.ERROR,
        type.view.FATAL,
        type.view.SUCCES,
      ],
    },
  }),
  animation: animation.setDisabled(),
};

/**
 * Typings
 */
export interface Notification {
  title: string;
  message: string;
  finalizeInvoice?: boolean;
}

export interface State {
  type: type.Type;
  cod: string;
  client?: Client;
  supplier?: Supplier;
  subTotal: number;
  iva: number;
  details: Detail[];
  isReadyDetail: boolean;
  isPaid: boolean;
  isComplete: boolean;
  loader: string;
  view: router.State<type.View>;
  animation: animation.State;
  error?: any;
}
