import * as type from "../type";

import { PreviewEmployee } from "shared";

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

export const goLogin = () => {
  return { type: type.app.LOGIN } as const;
};

export const goDashboard = (token: string, employee: PreviewEmployee) => {
  return { type: type.app.DASHBOARD, token, employee } as const;
};

export const endRoot = () => {
  return { type: type.app.END } as const;
};

export const goWelcome = () => {
  return { type: type.main.WELCOME } as const;
};

export const goInvoice = () => {
  return { type: type.main.INVOICE } as const;
};

export const goManagement = () => {
  return { type: type.main.MANAGEMENT } as const;
};

export const endMain = () => {
  return { type: type.main.END } as const;
};
