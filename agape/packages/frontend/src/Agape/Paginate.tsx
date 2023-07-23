import { useEffect, useMemo, useState } from "react";
import { useApi, useContextApi } from "./Session";
import { IAgapeApi } from "api/Agape";
import { usePromise } from "hook/usePromise";

/**
 * Before reviewing this component, be sure to read the project's API documentation to try
 * to understand how queries work.
 *
 * This should only be in the component tree once
 */
const defaultQuery = {};
export default function Paginate<T extends unknown[], Q extends unknown[]>(
  props: PropsProvider<T, Q>
): JSX.Element | null;
export default function Paginate(props: any) {
  /**
   * Variables
   */
  const { query = defaultQuery, source, OnResult, size } = props;

  const api = useContextApi();
  const model = useMemo(() => source(api), [source, api]);
  const [total, countRecords]: any = usePromise(model.count);
  const [page, findPage]: any = usePromise(model.findAll);

  const [state, setState] = useState(initState);

  console.log({ total, page, state });

  const initCount = total.result === undefined;

  const changePage = useMemo(() => {
    if (initCount) {
      return () => {
        throw new Error("you can't change page");
      };
    }

    const { page, pages, current } = paginate(query, size, total.result);

    setState({ query: page[current], page, pages, current });

    return (noPage: number) => {
      setState((state) => {
        if (state.current === noPage) {
          return state;
        }

        const query = state.page[noPage];

        return { ...state, query, current: noPage };
      });

      return page[noPage];
    };
  }, [size, query, total.result, initCount]);

  useEffect(() => {
    if (total.loading || !initCount) {
      return;
    }

    countRecords(query);
  }, [countRecords, initCount, query, total.loading]);

  useEffect(() => {
    if (!state.query) {
      return;
    }

    findPage(state.query);
  }, [findPage, state.query]);

  if (initCount && !total.loading) {
    return null;
  }

  if (total.loading) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (total.error) {
    console.log(total.error);
    return <div>Unhandler Error...</div>;
  }

  return (
    <OnResult
      isLoading={page.loading}
      pages={state.pages}
      page={state.current}
      rows={page.result}
      goPage={changePage}
      refresh={total.reset}
    />
  );
}

export function paginate(query: any, pageSize: number, amount: number) {
  const { limit, offset, ...findOpt } = query;

  const page: any = {};
  let index = 0;
  let noPage = 1;
  let current = 1;

  while (index < amount) {
    page[noPage] = { ...findOpt };

    page[noPage].limit = pageSize;
    page[noPage].offset = index;

    if (limit === pageSize && offset === index) {
      current = page;
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

function initState(): State {
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
interface State {
  query: any;
  current: number;
  page: {
    [K: number]: any;
  };
  pages: number[];
}

interface PropsProvider<T extends unknown[], Q extends unknown[]> {
  size: number;
  query?: Q[0];
  source: (api: IAgapeApi) => {
    count: (...args: Q) => Promise<number>;
    findAll: (...args: Q) => Promise<T>;
  };
  OnResult: (props: Props<T>) => JSX.Element;
}

export interface Props<T extends unknown[]> {
  loading: boolean;
  page: string;
  pages: string[];
  rows: T;
  refresh: () => void;
  goPage: (page: number) => void;
}
