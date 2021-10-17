import * as jwt from "jsonwebtoken";
import { ErrorInApp } from "../error";

/**
 * ok ... if you are thinking why I have not followed any convention
 * when handling sessions it is because I will only handle a single user,
 * so I did not see the need to implement something more elaborate.
 */

let token = "";

export function logout() {
  token = "";
}

export function isToken(val: string) {
  if (!token) {
    return false;
  }

  return val === token;
}

export function initAuth(key: string, myUser: string, myPassword: string) {
  return function login(user?: string, password?: string) {
    if (user !== myUser || password !== myPassword) {
      throw new ErrorInApp(404, "invalid user y/o password");
    }
    const opt: jwt.SignOptions = {
      expiresIn: "12h",
    };

    const payload = { user, password };

    return new Promise<string>((resolve, reject) => {
      jwt.sign(payload, key, opt, (error, res) => {
        if (error) return reject(error);

        token = res || "unknwon";

        return resolve(token);
      });
    });
  };
}

/**
 * Types
 */
export type Auth = ReturnType<typeof initAuth>;
