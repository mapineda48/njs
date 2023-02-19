import { FindOptions, findOptions } from "backend/integration";

export function paginateParams<T extends LocationOption>(
  location: T,
  pageSize: number,
  amount: number
) {
  const { pathname, search } = location;
  const pages: string[] = [];
  const param = new URLSearchParams(search);
  const json = param.get(findOptions);

  if (!json) {
    return pages;
  }

  const findOpt: FindOptions<{}> = JSON.parse(json);

  let index = 0;

  while (index < amount) {
    const query = { ...findOpt };
    query.limit = pageSize;
    query.offset = index;

    const params = buildSearchParams(query);
    const page = pathname + params;
    pages.push(page);

    index = index + pageSize;
  }

  return pages;
}

export function getSearchParams<T = any>(params: string): FindOptions<T> {
  const search = new URLSearchParams(params);

  const json = search.get(findOptions);

  if (!json) {
    return {};
  }

  const findOpt = JSON.parse(json);

  return findOpt;
}

export function buildSearchParams<T = any>(options?: FindOptions<T> | string) {
  if (!options) {
    return "";
  }

  if (typeof options === "string") {
    return options;
  }

  const search = new URLSearchParams({
    [findOptions]: JSON.stringify(options),
  });
  return "?" + search.toString();
}

/**
 * Types
 */
interface LocationOption {
  search: string;
  pathname: string;
}
