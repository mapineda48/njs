import queryString from "query-string";
import axios from "./axios";
import { api, Update, Insert, Select,Record } from "..";

export const client = {
  async deletePerson(id: number) {
    await axios.delete(`${api}/${id}/`);
  },

  async updatePerson(data: Update) {
    await axios.put(api, data);
  },

  async insertPerson(data: Insert) {
    await axios.post(api, data);
  },

  async selectPerson(opt: Select) {
    const query = JSON.stringify(opt);

    const url = queryString.stringifyUrl({
      url: api,
      query: { query },
    });

    const { data } = await axios.get(url);

    return data as Record[];
  },
};

export default client;

/**
 * Types
 */

export type Http = typeof client;
