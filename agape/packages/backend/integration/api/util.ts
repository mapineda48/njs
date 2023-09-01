/**
 * Types
 */
export type IApi<T, R> = {
  readonly [K in keyof T]: K extends keyof R
    ? R[K] extends (...args: infer A) => Promise<infer R>
      ? (...args: A) => Promise<R>
      : R[K] extends (...args: infer A) => infer R
      ? (...args: A) => Promise<R>
      : IApi<T[K], R[K]>
    : unknown;
};
