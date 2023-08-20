export function toRoute<T>(baseURL: string, map: IPath<T>): IRoute<T> {
  return Object.fromEntries(
    Object.entries(map).map(([key, val]) => {
      if (!val) {
        return [key, join(baseURL, key)];
      }

      if (typeof val === "string") {
        return [key, join(baseURL, val)];
      }

      return [key, toRoute(baseURL, val as IPath<T>)];
    })
  );
}

export function join(baseUrl: string, pathname: string) {
  return baseUrl + "/" + pathname;
}

/**
 * Types
 */
export type IApi<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => Promise<infer R>
    ? (...args: A) => Promise<R>
    : T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K] extends object
    ? IApi<T[K]>
    : unknown;
};

export type IRoute<T> = {
  readonly [K in keyof T]: T[K] extends (...args: any[]) => any
    ? string
    : T[K] extends object
    ? IRoute<T[K]>
    : unknown;
};

export type IPath<T> = {
  readonly [K in keyof T]: T[K] extends (...args: any[]) => any
    ? string | null
    : T[K] extends object
    ? IRoute<T[K]>
    : unknown;
};
