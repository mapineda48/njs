import * as jwt from "jsonwebtoken";
import { ErrorInApp } from "../error";
import type { Cache } from "../cache";

/**
 * ok ... if you are thinking why I have not followed any convention
 * when handling sessions it is because I will only handle a single user,
 * so I did not see the need to implement something more elaborate.
 */

export default class Auth {
  getCache() {
    return this.options.cache;
  }

  async logout() {
    const { cache } = this.options;

    await cache.delete("token");
  }

  async isToken(token: string) {
    const { cache } = this.options;

    const current = await cache.get("token");

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

    const { cache } = options;

    return new Promise<string>((resolve, reject) => {
      jwt.sign(payload, options.key, opt, (error, res) => {
        if (error) return reject(error);

        const token = res || "unknwon";

        cache
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
export type { Auth, Cache };

interface Opt {
  key: string;
  username: string;
  password: string;
  cache: Cache;
}
