import axios from "axios";
import queryString from "query-string";
import { api, State } from "../shared";
import { mock } from "../development/http";

const path = `/${api}`;

const urlState = queryString.stringifyUrl({
  url: path,
  query: { state: true },
});

const admin = {
  async setMaps(state: boolean) {
    try {
      await axios.put(path, { state });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async fetchState() {
    try {
      const { data } = await axios.get<State>(urlState);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default process.env.NODE_ENV === "development" ? mock : admin;

/**
 * Types
 */
export type Admin = typeof admin;
