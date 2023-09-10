import baseUrl from "./pathname.json";

export const pblic = factoryApi(baseUrl.public);
export const auth = factoryApi(baseUrl.auth);
export const shop = factoryApi(baseUrl.shop);
export const agape = factoryApi(baseUrl.agape);
export const model = factoryApi(baseUrl.model);

export function factoryApi(baseUrl: string): FactoryPath {
  const factory: unknown = (pathname: string | string[]) => {
    if (typeof pathname === "string") {
      return baseUrl + pathname;
    }

    return Object.fromEntries(
      pathname.map((path) => [path, baseUrl + toBaseName(path)])
    );
  };

  return factory as FactoryPath;
}

export function toBaseName(modelName: string) {
  return modelName
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2") // Inserta guiones antes de las letras mayúsculas
    .toLowerCase() // Convierte todo a minúsculas
    .replace(/^-/, ""); // Elimina el guión al inicio si existe
}

export { baseUrl };

/**
 * Types
 */
interface FactoryPath {
  (pathname: string): string;
  <T>(keys: string[]): { [K in keyof T]: string };
}
