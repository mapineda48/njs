import opp from "./opp";
import detail from "./detail";
import { api } from "../shared";

import type { Http } from "../http";

const rejs: string[] = [api.detail];

async function wait(url: string, time = 1000) {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      if (!rejs.includes(url)) return res();
      const err = new Error("im a bad error!");

      rej(err);
    }, time);
  });
}

const http: Http = {
  async fetchInitialState() {
    await wait(api.state);

    return {
      opportunity: {
        "1": opp.oppHits,
      },
    };
  },

  async fetchOpportunity(page) {
    await wait(api.opportunity);

    return opp.oppHits;
  },

  async fetchDetail(id) {
    await wait(api.detail);

    return detail;
  },
};

export default http;
