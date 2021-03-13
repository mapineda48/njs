export const FORCE_OPEN = "@mapineda48/personal/force-open/chat";

/**
 * Http
 */
export const api = {
  online: "/api/online",
  addRoom: "/api/room",
  addMessage: "/api/message",
  login: "/api/login",
  logout: "/api/logout",
};

/**
 * Socket
 */
export const HEADERTOKEN = "authorization-token";

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
