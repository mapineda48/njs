import { IMethod } from "./query";

export function toRoute<T>(baseUrl: string, models: string[]): IRoute<T> {
  const entries = models.map((m) => [m, baseUrl + toBaseName(m)]);

  return Object.fromEntries(entries);
}

/**
 * Model name to external route name
 */
export function toBaseName(modelName: string) {
  return modelName
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2") // Inserta guiones antes de las letras mayúsculas
    .toLowerCase() // Convierte todo a minúsculas
    .replace(/^-/, ""); // Elimina el guión al inicio si existe
}

/**
 * Types
 */
export type IRoute<T> = {
  readonly [K in keyof T]: T[K] extends IMethod<unknown, unknown>
    ? string
    : T[K] extends object
    ? IRoute<T[K]>
    : unknown;
};
