export function setBaseURL<T extends PathMap>(map: T, baseURL: string): T {
  return Object.fromEntries(
    Object.entries(map).map(([key, val]) => {
      if (typeof val === "string") {
        return [key, baseURL + val];
      }

      return [key, setBaseURL(val, baseURL)];
    })
  );
}

/**
 * Types
 */
type PathMap = {
  [K: string]: string | PathMap;
};

export type IFrontEndMethod<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => Promise<infer R>
    ? (...args: A) => Promise<R>
    : T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K] extends object
    ? IFrontEndMethod<T[K]>
    : unknown;
};

export type IRoute<T> = {
  readonly [K in keyof T]: T[K] extends (...args: any[]) => any
    ? string
    : T[K] extends object
    ? IRoute<T[K]>
    : unknown;
};
