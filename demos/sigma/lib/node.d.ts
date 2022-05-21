declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production";
    readonly PORT: string;
    readonly DATABASE_URL: string;
  }
}
