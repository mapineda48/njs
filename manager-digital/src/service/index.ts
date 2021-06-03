export const api = "api";

export const amountResults = 20;

/**
 * Types
 */

export type Update = Pick<Record, "id"> & Partial<Person>;

export interface Select extends Search {
  startRow?: number;
}

export type Search = Partial<Person>;

export type Insert = Person;

export interface Record extends Person {
  id: number;
}

export interface Person {
  full_name: string;
  dni: number;
  address: string;
  email: string;
}
