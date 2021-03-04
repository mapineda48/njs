export * from "./sync";
export * from "./async";

/**
 * Tyings
 */

type Sync = typeof import("./sync");

export type Action = ReturnType<Sync[keyof Sync]>;
