import { initReducer } from "hook/useState";
import { Pagination } from "./util";

export function deletePage(state: State): State {
  const pages = state.pages.filter((page) => page >= state.current);

  const page = Object.fromEntries(
    pages.map((page) => [page, state.page[page]])
  );

  const current = pages[pages.length + 1] ?? 1;

  return { query: page[current], page, pages, current };
}

export function changePage(state: State, noPage: number): State {
  if (state.current === noPage) {
    return state;
  }

  const query = state.page[noPage];

  return { ...state, query, current: noPage };
}

export function init(state: State, pagination: Pagination): State {
  const { page, current, pages } = pagination;

  return { query: page[current], page, pages, current };
}

export default initReducer({ changePage, deletePage, init });

/**
 * Types
 */
export interface State {
  query: any;
  current: number;
  page: {
    [K: number]: any;
  };
  pages: number[];
}
