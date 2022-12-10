/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production";
    readonly PORT: string;
    readonly GITHUB_TOKEN: string;
    readonly DATABASE_URL: string;
    readonly PERSONAL_USERNAME: string;
    readonly PERSONAL_PASSWORD: string;
    readonly REDIS_HOSTNAME: string;
    readonly REDIS_PORT: string;
    readonly REDIS_PASSWORD: string;
  }
}
