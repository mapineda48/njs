export const attribId = "initial-state";

export const api = {
  id: "api/cache/:id",
};

export const route = {
  root: "/",
  users: "/users",
  about: "/about",
};

export const routes = Object.values(route);

export function createUrlId(id: string) {
  return api.id.replace(":id", id);
}

/**
 * Types
 */

export interface Data {
  message: string;
}
