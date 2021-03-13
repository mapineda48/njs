export const prod = "root-chat";

export const dev = "root";

export const root = process.env.NODE_ENV === "development" ? dev : prod;
