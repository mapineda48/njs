import { IMethod } from "./query";

export function preparePath(modelName: string) {
  return modelName
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2") // Inserta guiones antes de las letras mayúsculas
    .toLowerCase() // Convierte todo a minúsculas
    .replace(/^-/, ""); // Elimina el guión al inicio si existe
}

export function setBaseURL<T extends PathMap>(map: T, baseURL: string): T {
  const res = Object.fromEntries(
    Object.entries(map).map(([key, val]) => {
      const route = preparePath(val);

      return [key, baseURL + route];
    })
  );

  return res as T;
}

/**
 * Types
 */
export type IRoute<T> = {
  readonly [K in keyof T]: T[K] extends IMethod<any, any>
    ? string
    : T[K] extends object
    ? IRoute<T[K]>
    : unknown;
};

type PathMap = {
  [K: string]: string;
};
