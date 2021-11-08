import axios from "axios";
import queryString from "query-string";
import { getApi } from "@api";
import baseUrl from "@backend/baseUrl";

import type { Colombia } from "@model/type";
import type { FindOpt, Person, Record } from "@model/person";

export const api = getApi(baseUrl);

export async function fetchColombia() {
  const { data } = await axios.get(api.sigma);

  return data as Colombia;
}

export const person = {
  async insert(person: Person) {
    const { data } = await axios.post(api.person, person);

    return data as Record;
  },

  async select(opt: FindOpt) {
    const q = JSON.stringify(opt);

    const url = queryString.stringifyUrl({
      url: api.person,
      query: { q },
    });

    const { data } = await axios.get(url);

    return data as Record[];
  },

  async update(person: Record) {
    const { data } = await axios.put(api.person, person);

    return data as Record;
  },

  async delete(id: number) {
    const url = api.person + "/" + id;

    await axios.delete(url);
  },
};
