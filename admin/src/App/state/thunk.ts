import http from "../../service/http";
import route from "../../route";

import type { History } from "history";
import type { App } from ".";

export function createThunk(history: History) {
  return {
    async isToken(app: App) {
      app.loading();

      try {
        const { token } = await app.getState();
        const res = await http.isToken(token);
        if (res) {
          app.sync();
          return;
        }

        history.replace(route.login);

        app.clearToken();
      } catch (error) {
        app.dialog({
          title: "Ups...",
          message: error.message,
          onAgree() {
            app.reset();
            history.replace(route.login);
          },
        });
      } finally {
        app.loading(false);
      }
    },

    async logOut(app: App) {
      await http.logOut();

      app.clearToken();
      history.replace(route.login);
    },

    async signIn(app: App, user: string, password: string) {
      const token = await http.login(user, password);
      app.setToken(token);
    },
  };
}
