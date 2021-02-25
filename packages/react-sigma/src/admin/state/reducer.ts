import * as view from "./view";
import { canFetch } from "./util";
import type { Record, Select, Colombia } from "shared";
import type { Modal } from "../Modals";
import type { Scroll, State, Confirm } from ".";

export function loading(state: State, isLoading = true): State {
  return { ...state, isLoading };
}

export function confirm(state: State, confirm: Confirm): State {
  return { ...state, confirm };
}

export function setColombia(state: State, colombia: Colombia): State {
  return { ...state, colombia };
}

export function welcome(state: State): State {
  return {
    ...state,
    current: view.WELCOME,
    search: { ...state.search, shouldClose: false },
  };
}

export function goSearch(state: State): State {
  const existsResults = state.search.results.length;

  if (!existsResults) {
    return { ...state, current: view.SEARCH };
  }

  if (!state.search.shouldClose) {
    return {
      ...state,
      current: view.SEARCH,
      search: { ...state.search, shouldClose: true },
    };
  }

  return {
    ...state,
    current: view.SEARCH,
    search: {
      ...state.search,
      results: [],
      current: view.search.FILTER,
      shouldClose: false,
    },
  };
}

export function goCreate(state: State): State {
  return {
    ...state,
    current: view.CREATE,
    search: { ...state.search, shouldClose: false },
  };
}

export const modal = {
  push(state: State, Component: Modal): State {
    return { ...state, Modals: [...state.Modals, Component] };
  },

  remove(state: State, index: number): State {
    const Modals = [...state.Modals];

    Modals.splice(index, 1);

    return { ...state, Modals };
  },
};

export const create = {
  loading(state: State, isLoading = true): State {
    return { ...state, create: { ...state.create, isLoading } };
  },
  confirm(state: State, confirm: Confirm): State {
    return { ...state, create: { ...state.create, confirm } };
  },
};

const scrollCanFetch = (state: Scroll, results: Record[]): Scroll => {
  if (!canFetch(results.length)) {
    return state;
  }

  return { ...state, canFetch: true };
};

export const search = {
  loading(state: State, isLoading = true): State {
    return { ...state, search: { ...state.search, isLoading } };
  },
  confirm(state: State, confirm: Confirm): State {
    return { ...state, search: { ...state.search, confirm } };
  },
  goFilter(state: State): State {
    return {
      ...state,
      search: { ...state.search, confirm: null, current: view.search.FILTER },
    };
  },

  setResults(state: State, query: Select, results: Record[]): State {
    return {
      ...state,
      search: {
        ...state.search,
        query:{...query},
        results: [...state.search.results, ...results],
        scroll: scrollCanFetch(state.search.scroll, results),
      },
    };
  },

  goResults(state: State, query: Select, results: Record[]): State {
    return {
      ...state,
      search: {
        ...state.search,
        confirm: null,
        shouldClose: true,
        current: view.search.RESULTS,
        query:{...query},
        results: [...results],
        scroll: scrollCanFetch(state.search.scroll, results),
      },
    };
  },

  removeResult(state: State, index: number): State {
    const results = [...state.search.results];

    results.splice(index, 1);

    if (results.length) {
      return { ...state, search: { ...state.search, results } };
    }

    return {
      ...state,
      search: {
        ...state.search,
        results: [],
        shouldClose: false,
        current: view.search.FILTER,
      },
    };
  },

  editResult(state: State, index: number, person: Record): State {
    const results = [...state.search.results];

    console.log({ target: results[index], value: person });

    if (results[index]) results[index] = { ...person };

    return { ...state, search: { ...state.search, results } };
  },

  scroll: {
    isLoading(state: State, isLoading = true): State {
      return {
        ...state,
        search: {
          ...state.search,
          scroll: { ...state.search.scroll, isLoading },
        },
      };
    },

    setNotFetch(state: State): State {
      return {
        ...state,
        search: {
          ...state.search,
          scroll: { ...state.search.scroll, canFetch: false },
        },
      };
    },
  },
};
