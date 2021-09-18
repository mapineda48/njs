import * as jwt from "jsonwebtoken";
import { ErrorInApp } from "./error";

/**
 * ok ... if you are thinking why I have not followed any convention
 * when handling sessions it is because I will only handle a single user, 
 * so I did not see the need to implement something more elaborate.
 */

export let key = generateKey();

export function createSession(myUser: string, myPassword: string) {
  async function session(user?: string, password?: string) {
    if (user !== myUser || password !== myPassword) {
      throw new ErrorInApp(404, "invalid user y/o password");
    }

    return await login({ user, password });
  }

  session.logout = logout;

  session.isToken = isToken;

  return session;
}

export async function logout(token: string) {
  const isValid = await isToken(token);

  if (!isValid) {
    throw new ErrorInApp(404, "invalid token");
  }

  key = generateKey();
}

export function login(payload: Payload) {
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

  return new Promise<boolean>(function cbIsToken(res, rej) {
    jwt.verify(token, key, (error, decode) => {
      if (error) {
        return res(false);
      }
      res(true);
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
