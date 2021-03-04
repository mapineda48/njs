import type { Person } from "shared";

const keys = ["full_name", "city", "department", "email"];

function entriesPerson<T extends Person>(person: T) {
  return Object.entries(person).filter(([key, val]) => keys.includes(key));
}

export function getRequired<T extends Person>(person: T): Person {
  return Object.fromEntries(entriesPerson(person)) as any;
}

export function getPartial<T extends Person>(person: T): IPerson {
  const res = entriesPerson(person).filter(([key, val]) => !!val);

  return res.reduce<any>((prev, [key, val]) => {
    if (!val) return prev;
    return { ...prev, [key]: val };
  }, {});
}

export function createCache(key: string) {
  return {
    load() {
      try {
        const cache = sessionStorage.getItem(key);

        if (cache) {
          const person: Person = JSON.parse(cache);

          return person;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    save(state: Person) {
      const cache = JSON.stringify(state);
      sessionStorage.setItem(key, cache);
    },

    clear() {
      sessionStorage.removeItem(key);
    },
  };
}

/**
 * Types
 */
type IPerson = Partial<Person>;

export type Cache = ReturnType<typeof createCache>;
