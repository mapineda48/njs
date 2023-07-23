import { initReducer } from "hook/useState";

export function deletePage(state: State, noPage: number): State {
  const pages = state.pages.filter((page) => page >= noPage);

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

export default initReducer({ changePage, deletePage });

/**
 * Types
 */
interface State {
  query: any;
  current: number;
  page: {
    [K: number]: any;
  };
  pages: number[];
}
