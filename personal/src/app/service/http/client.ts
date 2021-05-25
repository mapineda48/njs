import axios from "axios";
import queryString from "query-string";
import { api, HEADERTOKEN } from "..";

import type { ResRooms, ResRoom, ResSession, DataMessage, DataRoom } from "..";

export const http = handlerError({
  async getRooms(token: string) {
    const { data } = await axios.get<ResRooms>(api.getRooms, {
      headers: {
        [HEADERTOKEN]: token,
      },
    });

    return data.rooms;
  },

  async login(username: string, password: string) {
    const { data } = await axios.post(api.login, {
      username,
      password,
    });

    return data as ResSession;
  },

  async addMessage(data: DataMessage) {
    await axios.post(api.addMessage, data);
  },

  async addRoom(data: DataRoom) {
    const url = queryString.stringifyUrl({
      url: api.online,
      query: data as any,
    });

    const res = await axios.get(url);

    return res.data as ResRoom;
  },
});

function parseError(error: any) {
  console.log(error);

  const message = error?.response?.data?.message;

  if (message) {
    return Error(message);
  } else if (error.message) {
    return error;
  } else {
    return Error("Unknown Error");
  }
}

function handlerError<T>(client: T): T {
  return Object.fromEntries(
    Object.entries(client).map(([key, val]) => {
      return [
        key,
        async function (...args: any[]) {
          try {
            return await val.call(null, ...args);
          } catch (error) {
            throw parseError(error);
          }
        },
      ];
    })
  ) as any;
}

export default http;

/**
 * Types
 */
export type Http = typeof http;
