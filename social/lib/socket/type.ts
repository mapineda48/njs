export const NAMESPACE = "/mapineda48/chat";
export const AUTH_GUEST = "AUTH_GUEST";
export const AUTH_MIGUEL = "AUTH_MIGUEL";
export const MIGUEL = "Need work please contact me.";

export const AMOUNT_PAGE = 20;

export const UnhandlerError = { message: "unhandler server error" };

/**
 * Types
 */
export interface Message {
  room: string;
  writeBy: string;
  data: string;
}

export interface State {
  isOnlineMiguel: boolean;
}
