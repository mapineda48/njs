export const api = {
  sigma: "api/colombia",
  person: "api/person",
};

export function getApi(baseUrl?: string): Api;
export function getApi(baseUrl = "/"): any {
  return Object.fromEntries(
    Object.entries(api).map(([key, val]) => [key, baseUrl + val])
  );
}

/**
 * Types
 */
export interface Success {
  message: string;
}

export type Api = typeof api;
