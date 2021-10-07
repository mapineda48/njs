import type { Person as State, Colombia, Person } from "@model";


export function getPartial<T>(val: T): Partial<T>;
export function getPartial(val: any): any {
  return Object.fromEntries(
    Object.entries(val).filter(([, val]) => Boolean(val))
  );
}

export function initPerson(): Person {
  return {
    full_name: "",
    city: "",
    department: "",
    email: "",
  };
}