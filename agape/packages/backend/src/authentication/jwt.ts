import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

/**
 * https://www.npmjs.com/package/jsonwebtoken
 */
const opt: SignOptions = {
  expiresIn: "24h",
};

/**
 * Secret Or PrivateKey
 */
let delemiter = "";

/**
 * Set current secret to sign JWT
 */
export function setSecret(key: string) {
  delemiter = key;
}

/**
 * sign token
 */
export function sign(payload: object | string, ...secrets: string[]) {
  if (!delemiter) {
    throw new Error("Unhandler jwt.sign");
  }

  if (secrets.length < 2) {
    secrets.push(delemiter);
  }

  const secret = secrets.join(delemiter);

  return new Promise<string>((res, rej) => {
    jwt.sign(payload, secret, opt, (err, token) => {
      if (err) return rej(err);

      if (!token) {
        return rej(new Error("Unhandler jwt.sign"));
      }

      res(token);
    });
  });
}

/**
 * verify token
 */
export function verify(payload: string, ...secrets: string[]) {
  if (!delemiter) {
    throw new Error("Unhandler jwt.verify");
  }

  if (secrets.length < 2) {
    secrets.push(delemiter);
  }

  const secret = secrets.join(delemiter);

  return new Promise<JwtPayload | string>((res, rej) => {
    jwt.verify(payload, secret, (err, token) => {
      if (err) return rej(err);

      if (!token) {
        return rej(new Error("Unhandler jwt.sign"));
      }

      res(token);
    });
  });
}
