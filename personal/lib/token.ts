import jwt from "jsonwebtoken";
import { getRandom } from "../src/production";

export const error = {
  INVALID: "username y/o password it's wrong!!!",
  INVALID_TOKEN: "invalid token.",
  MALFORMED: "jwt malformed",
  MISSING: "missing token",
};

export class JWT {
  private username = "";
  private password = "";

  private key = getRandom();

  private current = "";

  constructor(auth: Auth) {
    this.username = auth.username;
    this.password = auth.password;
    
  }

  async sigin(auth: Auth) {
    if (this.username !== auth.username || this.password !== auth.password) {
      throw new Error(error.INVALID);
    }

    this.key = getRandom();

    return new Promise<string>((resolve, reject) => {
      jwt.sign(auth, this.key, {}, (error: any, token: any) => {
        if (error) return reject(error);
        this.current = token;
        return resolve(token || "");
      });
    });
  }

  async verify(token: string) {
    return new Promise<any>((resolve, reject) => {
      jwt.verify(token, this.key, (error: any, decode: any) => {
        if (error) return reject(error);
        return resolve(decode);
      });
    });
  }

  getToken() {
    return this.current;
  }

  check(token: string) {
    if (!token) {
      throw new Error(error.MISSING);
    }

    const isValid = token === this.current;

    if (isValid) return;

    throw new Error(error.INVALID_TOKEN);
  }
}

/**
 * Types
 */
export interface Auth {
  username: string;
  password: string;
}

type Payload = Parameters<typeof jwt.sign>[0];
