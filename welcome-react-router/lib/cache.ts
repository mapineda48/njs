import type { RedisClient } from "redis";

export function createCache(client: RedisClient) {
  return {
    async set(val: string) {
      return new Promise<string>((res, rej) => {
        const key = "welcome-react-router-" + Date.now();

        client.set(key, val, "EX", 10, (err) => {
          if (err) return rej(err);
          res(key);
        });
      });
    },

    async get(key: string) {
      return new Promise<string>((res, rej) => {
        client.get(key, (err, reply) => {
          if (reply) return res(reply);

          if (err) return rej(err);
          rej(new Error(`not found key "${key}"`));
        });
      });
    },
  };
}
