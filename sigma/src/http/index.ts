import axios from "axios";
import queryString from "query-string";
import createMock from "../development/http";

import type {
  ApiRoute,
  Colombia,
  Record,
  Insert,
  Update,
  Select,
} from "shared";

const parseError = (error: any) => {
  console.log(error);

  const message = error?.response?.data?.message;

  if (message) {
    return Error(message);
  } else if (error.message) {
    return error;
  } else {
    return Error("Unknown Error");
  }
};

export function applyBaseUrl<T extends IApi>(baseUrl: string, obj: T): T {
  const res: any = { ...obj };

  for (const key in res) {
    if (Object.prototype.hasOwnProperty.call(res, key)) {
      res[key] = baseUrl + res[key];
    }
  }

  return res;
}

export function create(api: ApiRoute) {
  return {
    async fetchColombia() {
      try {
        const { data } = await axios.get<Colombia>(api.sigma);

        return data;
      } catch (error) {
        throw parseError(error);
      }
    },

    async fetchPerson(query: Select) {
      try {
        const opt = JSON.stringify(query);

        const url = queryString.stringifyUrl({
          url: api.person,
          query: { opt },
        });

        const { data } = await axios.get<Record[]>(url);

        return data;
      } catch (error) {
        throw parseError(error);
      }
    },

    async insertPerson(person: Insert) {
      try {
        await axios.post(api.person, person);
      } catch (error) {
        throw parseError(error);
      }
    },

    async updatePerson(person: Update) {
      try {
        await axios.put(api.person, person);
      } catch (error) {
        throw parseError(error);
      }
    },

    async deletePerson(id: number) {
      try {
        await axios.delete(`${api.person}/${id}`);
      } catch (error) {
        throw parseError(error);
      }
    },
  };
}

export default process.env.NODE_ENV === "development" ? createMock : create;

/**
 * Types
 */
type IApi = { [K: string]: string };

export type CreateHttp = typeof create;
