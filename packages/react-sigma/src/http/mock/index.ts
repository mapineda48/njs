import { http } from "..";
import mocks from "./mocks";
import mock from "./mock";

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

export const fetchColombia: FetchColombia = async () => {
  return currentPromise(mock);
};

export const fetchPerson: FetchPerson = async (opt) => {
  //const [person] = mocks;

  return currentPromise(mocks);
};

export const insertPerson: InsertPerson = async (opt) => {
  return currentPromise();
};

export const updatePerson: UpdatePerson = async () => {
  return currentPromise();
};

export const deletePerson: DeletePerson = async () => {
  return currentPromise();
};

export default {
  fetchColombia,
  fetchPerson,
  insertPerson,
  updatePerson,
  deletePerson,
};

/**
 * Types
 */
type FetchColombia = typeof http.fetchColombia;

type FetchPerson = typeof http.fetchPerson;

type InsertPerson = typeof http.insertPerson;

type UpdatePerson = typeof http.updatePerson;

type DeletePerson = typeof http.deletePerson;
