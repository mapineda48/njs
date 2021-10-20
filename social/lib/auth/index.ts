import * as jwt from "jsonwebtoken";
import { ErrorInApp } from "../error";
import type { Store } from "../store";

/**
 * ok ... if you are thinking why I have not followed any convention
 * when handling sessions it is because I will only handle a single user,
 * so I did not see the need to implement something more elaborate.
 */

export default class Auth {
  async logout() {
    const { store } = this.options;

    await store.map.delete("token");
  }

  async isToken(token: string) {
    const { store } = this.options;

    const current = await store.map.get<string>("token");

    if (!current || token !== current) {
      return false;
    }

    return true;
  }

  async login(username: string, password: string) {
    const { options } = this;

    if (username !== options.username || password !== options.password) {
      throw new ErrorInApp(404, "invalid user y/o password");
    }
    const opt: jwt.SignOptions = {
      expiresIn: "12h",
    };

    const payload = { username, password };

    const { store } = options;

    return new Promise<string>((resolve, reject) => {
      jwt.sign(payload, options.key, opt, (error, res) => {
        if (error) return reject(error);

        const token = res || "unknwon";

        store.map
          .set("token", token)
          .then(() => {
            resolve(token);
          })
          .catch(reject);
      });
    });
  }

  constructor(private options: Opt) {}
}

/**
 * Types
 */
export type { Auth };

interface Opt {
  key: string;
  username: string;
  password: string;
  store: Store;
}
