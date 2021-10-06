import axios from "axios";
import queryString from "query-string";
import { api, amountOpportunitys, RestOpportunity, RestDetail } from "../backend";

export const http = {
  async fetchOpportunity(page: number) {
    const startRecordNum = (page - 1) * amountOpportunitys;

    const url = queryString.stringifyUrl({
      url: api.opportunity,
      query: { startRecordNum },
    });

    const { data } = await axios.get<RestOpportunity>(url);

    return data.oppHits;
  },

  async fetchDetail(id: number) {
    const url = queryString.stringifyUrl({
      url: api.detail,
      query: { id },
    });

    const { data } = await axios.get<RestDetail>(url);

    return data;
  },
};

export default http;

/**
 * Types
 */
export type Http = typeof http;
