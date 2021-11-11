import type { RedisClient } from "redis";

const prefix = "social_";

export default class Cache {
  constructor(private redis: RedisClient) {}

  get(key: string) {
    return new Promise<string | null>((res, rej) => {
      this.redis.get(this.prefix(key), (err, val) => {
        if (err) return rej(err);

        res(val);
      });
    });
  }

  set(key: string, val: string) {
    return new Promise<void>((res, rej) => {
      this.redis.set(this.prefix(key), val, (err) => {
        if (err) return rej(err);
        res();
      });
    });
  }

  delete(key: string) {
    return new Promise<void>((res, rej) => {
      this.redis.del(this.prefix(key), (err) => {
        if (err) return rej(err);

        res();
      });
    });
  }

  private prefix(key: string) {
    return prefix + key;
  }
}

/**
 * Types
 */

export type { Cache };
