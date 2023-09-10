import { auth as api } from "../../baseUrl";

export const route = api("agape");

/**
 * Types
 */
export interface Authenticate {
  (token: string): Promise<Auth>;
  (username: string, password: string): Promise<Auth>;
}

export interface Auth {
  token: string;
  user: User;
}

export interface User {
  id: number;
  fullName: string;
  avatarUrl: string;
}
