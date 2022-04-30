import * as jwt from "jsonwebtoken";
import { ErrorApp } from "../error/Error";
const SECRET = "im a secret";
export class JWT {
  async verify(token: string) {
    return new Promise<boolean>((res, rej) => {
      jwt.verify(token, this.opt.key, (err, payload) => {
        if (err) {
          return rej(err);
        }

        if (payload?.foo === SECRET) {
          res(true);
        }

        res(false);
      });
    });
  }

  async login(username: string, password: string) {
    const { opt } = this;

    if (username !== opt.username || password !== opt.password) {
      throw new ErrorApp("invalid user y/o password");
    }
    const signOptions: jwt.SignOptions = {
      expiresIn: "12h",
    };

    const payload = {
      foo: SECRET,
    };

    return new Promise<string>((res, rej) => {
      jwt.sign(payload, opt.key, signOptions, (err, token) => {
        if (err) {
          return rej(err);
        }

        if (!token) {
          const errInApp = new ErrorApp("twj ups...");
          return rej(errInApp);
        }

        res(token);
      });
    });
  }

  constructor(private opt: OptionFactoryToken) {}
}

/**
 * Types
 */

interface OptionFactoryToken {
  username: string;
  password: string;
  key: string;
}
