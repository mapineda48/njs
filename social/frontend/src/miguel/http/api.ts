import axios from "axios";
import queryString from "query-string";
import { PATH_API, PATH_LOGIN } from "@api";
import { BASE_URL } from "../../env";

const http = axios.create({ baseURL: BASE_URL + PATH_API });

const STORAGE_TOKEN_MIGUEL = "miguel-token";

export async function existsToken() {
  const token = localStorage.getItem(STORAGE_TOKEN_MIGUEL);

  if (!token) {
    return null;
  }

  const url = queryString.stringifyUrl({
    url: PATH_LOGIN,
    query: { token },
  });

  try {
    const { data } = await http.get(url);

    if (!data) {
      return null;
    }

    return token;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function login(username: string, password: string) {
  const { data } = await http.post(PATH_LOGIN, { username, password });

  localStorage.setItem(STORAGE_TOKEN_MIGUEL, data);

  return data as string;
}
