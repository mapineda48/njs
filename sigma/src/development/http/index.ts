import colombia from "./mock";
import persons from "./mocks";
import { api } from "shared";
import type { CreateHttp } from "../../http";

/**
 * This file only exists in development environment, in production version it will be removed by webpack.
 */
const rejects: string[] = [];

async function wait(url: string, needRej = false, time = 1000) {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      if (!rejects.includes(url) && !needRej) return res();
      const error = new Error(
        "This file only exists in development environment, in production version it will be removed by webpack"
      );
      rej(error);
    }, time);
  });
}

const createMock: CreateHttp = (_api) => {
  return {
    async fetchColombia() {
      await wait(api.sigma);

      return colombia;
    },
    async fetchPerson(query) {
      await wait(api.person);

      return persons;
    },
    async insertPerson(person) {
      await wait(api.person);
      return;
    },
    async updatePerson(person) {
      await wait(api.person);
      return;
    },
    async deletePerson(id) {
      await wait(api.person);
      return;
    },
  };
};

export default createMock;
