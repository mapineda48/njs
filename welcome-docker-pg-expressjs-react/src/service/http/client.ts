import axios from "./axios";
import { api, DataGreet } from "..";

export const client = {
  async greet() {
    const { data } = await axios.get(api);

    return data as DataGreet;
  },
};

export default client;

/**
 * Types
 */

export type Http = typeof client;
