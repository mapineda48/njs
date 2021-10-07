import axios from "axios";
import queryString from "query-string";
import { getApi, Success } from "@api";

import type { Colombia, Person, Select, Update, Record } from "@model";

export const api = getApi("../");

export async function fetchColombia() {
  const { data } = await axios.get(api.sigma);

  return data as Colombia;
}

export const person = {
  async insert(person: Person) {
    const { data } = await axios.post(api.person, { person });

    return data as Success;
  },

  async select(query: Select) {
    const q = JSON.stringify(query);

    const url = queryString.stringifyUrl({
      url: api.person,
      query: { q },
    });

    const { data } = await axios.get(url);

    return data as Record[];
  },

  async update(person: Update) {
    const { data } = await axios.put(api.person, { person });

    return data as Success;
  },

  async delete(id: number) {
    const url = api.person + "/" + id;

    const { data } = await axios.delete(url);

    return data as Success;
  },
};
