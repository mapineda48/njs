/**
 * Util
 */

export const FORCE_OPEN = "@mapineda48/personal/force-open/chat";

/**
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 */

export function getRandom() {
  return Math.random().toString(36).substring(2);
}

/**
 * Http
 */
export const api = {
  online: "/api/online",
  addRoom: "/api/room",
  addMessage: "/api/message",
  login: "/api/login",
  getGuests: "/api/guests",
};

/**
 * Socket
 */
export const HEADERTOKEN = "authorization-admin-personal";
export const ROOM_ID = "id-guest-chat-personal";

export const event = {
  type: {
    ADDMESSAGE: "@mapineda48/personal/:id/add-message",
    ADDROOM: "@mapineda48/personal/:token/add-room",
    ONLINE: "@mapineda48/personal/online",
  },
  addMessage(id: string) {
    return this.type.ADDMESSAGE.replace(":id", id.toString());
  },
  addRoom(token: string) {
    return this.type.ADDROOM.replace(":token", token);
  },
  online() {
    return this.type.ONLINE;
  },
};

/**
 * Types
 */

export interface Message {
  writeByMiguel?: boolean;
  content: string;
}
