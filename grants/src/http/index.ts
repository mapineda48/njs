import axios from "axios";
import queryString from "query-string";
import { api, amountOpportunitys, RestOpportunity, RestDetail } from "../shared";
import mock from "./development/http";

import type { Init } from "../App/state";

export const http = {
  async fetchInitialState(id: number) {
    const url = queryString.stringifyUrl({
      url: api.state,
      query: { id },
    });

    const { data } = await axios.get<Init>(url);

    return data;
  },

  async fetchOpportunity(page: number) {
    const startRecordNum = (page - 1) * amountOpportunitys;

    const { data } = await axios.post<RestOpportunity>(api.opportunity, {
      startRecordNum,
    });

    return data.oppHits;
  },

  async fetchDetail(id: number) {
    const { data } = await axios.post<RestDetail>(api.detail, { id });

    return data;
  },
};

export default process.env.NODE_ENV === "development" ? mock : http;

/**
 * Types
 */
export type Http = typeof http;
