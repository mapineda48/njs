import type { Insert, Search } from "../../service";

export function search(person: Insert): Search {
  const filter: any = Object.fromEntries(
    Object.entries(person).filter(([key, val]) => val)
  );

  return filter;
}
