import http from "app/service/http";
import type { Login } from ".";

import type { ResSession } from "app/service";

export async function login(login: Login) {
  login.loading();
  try {
    const state = await login.getState();

    const session = await http.login(state.username, state.password);

    login.setSession(session);
  } catch (error) {
    login.setMessage(error.message);
  } finally {
    login.loading(false);
  }
}

/**
 * Types
 */
export type OnSession = (session:ResSession) => void;
