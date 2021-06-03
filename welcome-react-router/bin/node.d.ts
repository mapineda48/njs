/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production";
    readonly PORT: string;
    readonly PUBLIC_URL: string;
    readonly DATABASE_URL: string;
    readonly CACHE_URL: string;
  }
}
