import http from "production/http";
import type { Login } from ".";

import type { Session } from "production/http";

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
export type OnSession = (session: Session) => void;
