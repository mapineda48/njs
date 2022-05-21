import type { Person } from "@model/person";

export function getPartial<T>(val: T): Partial<T>;
export function getPartial(val: any): any {
  return Object.fromEntries(
    Object.entries(val).filter(([, val]) => Boolean(val))
  );
}

export function initPerson(): Person {
  return {
    fullName: "",
    city: "",
    department: "",
    email: "",
  };
}
