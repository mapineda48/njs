import type { State } from "./state";

export function paginate(query: any, amount: number) {
  const { limit, offset, ...findOpt } = query;

  const pageSize = limit - offset;

  const page: any = {};
  let index = 0;
  let noPage = 1;
  let current = 1;

  while (index < amount) {
    page[noPage] = { ...findOpt };

    page[noPage].limit = pageSize;
    page[noPage].offset = index;

    if (limit === pageSize && offset === index) {
      current = noPage;
    }

    index = index + pageSize;
    noPage++;
  }

  return {
    page,
    pages: Object.keys(page).map(parseInt),
    current,
  };
}

export function initState(): State {
  return {
    query: null,
    current: 0,
    page: {},
    pages: [],
  };
}

/**
 * Types
 */

export type Pagination = ReturnType<typeof paginate>;
