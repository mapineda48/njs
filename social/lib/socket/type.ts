export const NAMESPACE = "/mapineda48/chat";
export const GUEST = "Guest-Id";
export const TOKEN = "Miguel-Token";
export const MIGUEL = "Need work please contact me.";

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
