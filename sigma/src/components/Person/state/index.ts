import React from "react";
import { useAction, Action } from "mapineda-react/useAction";
import * as reducer from "./reducer";
import { createCache, Cache } from "./util";
import type { Person } from "shared";

export function createPerson(): Person {
  return {
    department: "",
    city: "",
    full_name: "",
    email: "",
  };
}

export function create(opt?: Opt): State {
  const { cacheOnKey, person } = opt || {};

  if (!cacheOnKey) {
    if (person) {
      return {
        person: { ...person },
        cache: null,
      };
    }

    return {
      person: createPerson(),
      cache: null,
    };
  }

  const cache = createCache(cacheOnKey);

  const personInCache = cache.load();

  if (personInCache) {
    return {
      person: personInCache,
      cache,
    };
  }

  if (person) {
    return {
      person,
      cache,
    };
  }

  return {
    person: createPerson(),
    cache,
  };
}

export default function useState(opt: Opt) {
  const [state, setState] = React.useState(() => create(opt));

  const person = useAction(setState, reducer);

  return [state, person, setState] as const;
}

/**
 * Types
 */
export interface State {
  person: Person;
  cache: Cache | null;
}

type Reducer = typeof reducer;

export type Form = Action<Reducer, State>;

export interface Opt {
  cacheOnKey?: string;
  person?: Person;
}
