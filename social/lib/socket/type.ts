export const FORCE_OPEN = "@mapineda48/personal/force-open/chat";

export const NAMESPACE = "/mapineda48/chat";

export const GUEST = "Guest-Id";

export const TOKEN = "Miguel-Token";

export const MIGUEL = "Need work please contact me.";

export const event = {
  guestOnline: "guest-online",
  addMessage: "add-message",
  isOnlineMiguel: "is-online-miguel",
  roomsAvailable: "rooms-available",
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
