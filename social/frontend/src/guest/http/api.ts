import axios from "axios";
import queryString from "query-string";
import { PATH_API, PATH_GUEST } from "@api";
import { BASE_URL } from "../../env";

const http = axios.create({ baseURL: BASE_URL + PATH_API });

const STORAGE_KEY_ID = "guestID";

export async function getGuestID() {
  const id = localStorage.getItem(STORAGE_KEY_ID);

  if (id && (await existsGuestID(id))) {
    return Promise.resolve(id);
  }

  const data = await createGuestID();

  localStorage.setItem(STORAGE_KEY_ID, data);

  return data as string;
}

export async function existsGuestID(id: string) {
  const url = queryString.stringifyUrl({
    url: PATH_GUEST,
    query: { id },
  });

  const { data } = await http.get(url);

  return data as boolean;
}

export async function createGuestID() {
  const { data } = await http.post(PATH_GUEST);

  return data as string;
}
