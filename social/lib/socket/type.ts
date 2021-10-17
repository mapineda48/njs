export const NAMESPACE = "/mapineda48/chat";

export const GUEST = "Guest-Id";

export const TOKEN = "Miguel-Token";

export const MIGUEL = "Need work please contact me.";

export const event = {
  GUEST_ONLINE: "0",
  ADD_MESSAGE: "1",
  MIGUEL_ONLINE: "2",
  ROOMS_AVAILABLE: "3",
  PUBLIC_KEY: "4",
  SAVE_SUBSCRIPTION: "5",
  REMOVE_SUBSCRIPTION: "6",
  FORCE_OPEN: "7",
};

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
