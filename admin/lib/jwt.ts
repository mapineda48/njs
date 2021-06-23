import * as jwt from "jsonwebtoken";
import { ErrorInApp } from "./error";

export let key = generateKey();

export function createSession(myUser: string, myPassword: string) {
  async function session(user?: string, password?: string) {
    if (user !== myUser || password !== myPassword) {
      throw new ErrorInApp(404, "invalid user y/o password");
    }

    return await signin({ user, password });
  }

  session.isToken = async function _isToken(token: string) {
    try {
      await isToken(token);
      return true;
    } catch (error) {
      return false;
    }
  };

  session.end = function end() {
    key = generateKey();
  };

  return session;
}

export function signin(payload: Payload) {
  const opt: jwt.SignOptions = {
    expiresIn: "12h",
  };

  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, key, opt, (error: any, token: any) => {
      if (error) return reject(error);
      return resolve(token || "");
    });
  });
}

export function isToken(token: string) {
  if (!token) {
    throw new ErrorInApp(404, "token must be provided");
  }

  return new Promise<{} | undefined>(function cbIsToken(res, rej) {
    jwt.verify(token, key, (error, decode) => {
      if (error) {
        rej(error);
        return;
      }
      res(decode);
    });
  });
}

/**
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 */
export function generateKey() {
  return Math.random().toString(36).substring(2);
}

/**
 * Typings
 */

type Payload = Parameters<typeof jwt.sign>[0];
