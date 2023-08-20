/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production";
    readonly PORT: string;
    readonly DATABASE_URL: string;
    readonly STORAGE_ENDPOINT: string;
    readonly STORAGE_ACCESKEY: string;
    readonly STORAGE_ACCESSECRET: string;
    readonly JWT_SECRET: string;
  }
}
