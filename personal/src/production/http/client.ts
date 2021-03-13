import axios from "axios";
import queryString from "query-string";
import { api, HEADERTOKEN } from "..";

import type { Message }  from "..";

export const http = {
  async getGuests(token: string) {
    try {
      const { data } = await axios.get<ResGuests>(api.getGuests, {
        headers: {
          [HEADERTOKEN]: token,
        },
      });

      return data.guests;
    } catch (error) {
      throw parseError(error);
    }
  },

  async login(username: string, password: string) {
    try {
      const { data } = await axios.post<Session>(api.login, {
        username,
        password,
      });

      return data;
    } catch (error) {
      throw parseError(error);
    }
  },

  async addMessage(data: PostMessage) {
    try {
      await axios.post(api.addMessage, data);
    } catch (error) {
      throw parseError(error);
    }
  },

  async isOnline(data: PostRoom) {
    const url = queryString.stringifyUrl({
      url: api.online,
      query: data as any,
    });

    try {
      const { data } = await axios.get<ResOnline>(url);

      return data;
    } catch (error) {
      throw parseError(error);
    }
  },
};

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

export default http;

/**
 * Types
 */
export type Http = typeof http;

/**
 * Types
 */
export interface Session {
  token: string;
}

export interface PostMessage {
  id: string;
  message: Message;
}

export interface PostRoom {
  room: string;
}

export interface ResOnline {
  online: boolean;
}

export interface ResGuests {
  guests: string[];
}

export type { Message };
