/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production";
    readonly PORT: string;
    readonly PUBLIC_URL: string;
    readonly PERSONAL_USERNAME: string;
    readonly PERSONAL_PASSWORD: string;
  }
}
