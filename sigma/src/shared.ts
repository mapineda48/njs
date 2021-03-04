export const api = {
  sigma: "api/colombia",
  person: "api/person",
};

export const amountResults = 20;

/**
 * Types
 */
export interface Person {
  full_name: string;
  email: string;
  city: string;
  department: string;
}

export type Insert = Person;

export interface Select extends Partial<Person> {
  startRow?: number;
}

export interface Update extends Partial<Person> {
  id: number;
}

export interface Record extends Person {
  id: number;
}

export type Colombia = { [K: string]: string[] };

export type ApiRoute = typeof api;
