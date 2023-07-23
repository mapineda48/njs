import { useCallback, useEffect, useMemo } from "react";
import { useContextApi } from "./Session";
import { IAgapeApi } from "api/Agape";
import { usePromise } from "hook/usePromise.v2";
import useState from "./Paginate.v2.state";
import React from "react";

/**
 * Before reviewing this component, be sure to read the project's API documentation to try
 * to understand how queries work.
 *
 * This should only be in the component tree once
 */
export default function setPaginate<T extends unknown[], Q extends unknown[]>(
  opt: Options<T, Q>
): (props: PropsTable) => JSX.Element | null;
export default function setPaginate(opt: any) {
  const defaultQuery = {};

  return function Paginate(props: PropsTable) {
    /**
     * Variables
     */
    const { query = defaultQuery, source, OnResult, size } = opt;

    const api = useContextApi();
    const model = useMemo(() => source(api), [source, api]);
    const [total, countRecords]: any = usePromise(model.count);
    const [page, findPage]: any = usePromise({
      cb: model.findAll,
      keepResult: true,
      initialState: [],
    });

    const [state, paginate, setState] = useState(initState);

    //console.log({ total, page, state });

    const initCount = total.result === undefined;

    useMemo(() => {
      if (initCount) {
        return () => {
          throw new Error("you can't change page");
        };
      }

      const { page, pages, current } = paginate(query, size, total.result);

      setState({ query: page[current], page, pages, current });
    }, [initCount, query, size, total.result, setState]);

    const refresh = useCallback(
      () => findPage(state.query),
      [findPage, state.query]
    );

    if (props.onRef) {
      props.onRef.current.refresh = refresh;
      props.onRef.current.reload = total.reset;
    }

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

    const currentPage = state.current;
    useEffect(() => {
      if (page.result.length || currentPage <= 1) {
        return;
      }

      paginate.deletePage(currentPage);
    }, [page.result.length, currentPage, paginate]);

    if (initCount && !total.loading) {
      return null;
    }

    console.log(page);
    if (total.loading) {
      console.log(page);
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
        goPage={paginate.changePage}
        reload={total.reset}
        refresh={refresh}
      />
    );
  };
}

export function useRef() {
  const ref = React.useRef({ refresh: () => {}, reload: () => {} });

  return useMemo(() => {
    return {
      get current() {
        return ref.current;
      },

      get refresh() {
        return ref.current.refresh;
      },

      get reload() {
        return ref.current.reload;
      },
    };
  }, []);
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

interface Options<T extends unknown[], Q extends unknown[]> {
  size: number;
  query?: Q[0];
  source: (api: IAgapeApi) => {
    count: (...args: Q) => Promise<number>;
    findAll: (...args: Q) => Promise<T>;
  };
  OnResult: (props: Props<T>) => JSX.Element;
}

export interface PropsTable {
  onRef?: Ref;
}

export type Ref = ReturnType<typeof useRef>;

export interface Props<T extends unknown[]> {
  loading: boolean;
  page: string;
  pages: string[];
  rows: T;
  reload: () => void;
  refresh: () => void;
  goPage: (page: number) => void;
}
