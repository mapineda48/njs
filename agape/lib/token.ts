import jwt, { SignOptions } from "jsonwebtoken";

/**
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 */
const key = Math.random().toString(36).substring(2);

const sign = (payload: Payload) => {
  const opt: SignOptions = {
    expiresIn: "12h",
  };

  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, key, opt, (error: any, token: any) => {
      if (error) return reject(error);
      return resolve(token || "");
    });
  });
};

const verify = (token: string) => {
  return new Promise<{} | undefined>((resolve, reject) => {
    jwt.verify(token, key, (error, decode) => {
      if (error) return reject(error);
      return resolve(decode);
    });
  });
};

export = {
  key,
  sign,
  verify,
};

/**
 * Typings
 */

type Payload = Parameters<typeof jwt.sign>[0];
