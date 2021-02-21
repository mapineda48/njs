import axios from "axios";
import queryString from "query-string";
import { Colombia, Record, Insert, Update, Select } from "shared";
import { isAdmin } from "../router";
import mock from "./mock";

const route = isAdmin
  ? {
      sigma: "../api/sigma/colombia",
      person: "../api/person",
    }
  : {
      sigma: "api/sigma/colombia",
      person: "api/person",
    };

const handlerError = (config: any) => {
  console.log(config);

  const message = config?.response?.data?.message;

  if (message) {
    throw new Error(message);
  } else {
    throw new Error("Error Desconocido");
  }
};

export async function fetchColombia() {
  try {
    const { data } = await axios.get(route.sigma);

    return data as Colombia;
  } catch (error) {
    handlerError(error);
    return (null as any) as Colombia;
  }
}

export async function fetchPerson(query: Select) {
  try {
    const url = queryString.stringifyUrl({
      url: route.person,
      query: { opt: JSON.stringify(query) },
    });

    const { data } = await axios.get(url);

    return data as Record[];
  } catch (error) {
    handlerError(error);
    return [];
  }
}

export async function insertPerson(person: Insert) {
  try {
    await axios.post(route.person, person);
  } catch (error) {
    handlerError(error);
  }
}

export async function updatePerson(person: Update) {
  try {
    await axios.put(route.person, person);
  } catch (error) {
    handlerError(error);
  }
}

export async function deletePerson(id: number) {
  try {
    await axios.delete(`${route.person}/${id}`);
  } catch (error) {
    handlerError(error);
  }
}

export const http = {
  fetchColombia,
  fetchPerson,
  insertPerson,
  updatePerson,
  deletePerson,
};

export default process.env.NODE_ENV === "development" ? mock : http;
