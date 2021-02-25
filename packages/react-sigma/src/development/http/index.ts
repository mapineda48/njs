import colombia from "./mock";
import persons from "./mocks";
import type { CreateHttp } from "../../http";

/**
 * This file only exists in development environment, in production version it will be removed by webpack.
 */

const timePromise = 1000;

const isResolve = true;

/**
 * mock Promise
 */
const resolve = <T>(value?: T) => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      resolve(value as any);
    }, timePromise);
  });
};

const reject = <T>(value?: T) => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("something wrong on promise"));
    }, timePromise);
  });
};

const currentPromise = isResolve ? resolve : reject;

const createMock: CreateHttp = (api) => {
  return {
    fetchColombia() {
      return currentPromise(colombia);
    },
    fetchPerson(query) {
      return currentPromise(persons);
    },
    insertPerson(person) {
      return currentPromise();
    },
    updatePerson(person) {
      return currentPromise();
    },
    deletePerson(id) {
      return currentPromise();
    },
  };
};

export default createMock;
