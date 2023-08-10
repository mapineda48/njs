import { useCallback, useEffect, useMemo } from "react";
import { useContextApi } from "../Session";
import { IDashboard } from "api/agape";
import { usePromise } from "hook/usePromise";
import useState from "./state";
import React from "react";
import { initState, paginate } from "./util";
import { useTask } from "hook/useTask";

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
    const { query = defaultQuery, source, OnResult } = opt;

    const api = useContextApi();
    const model = useMemo(() => source(api), [source, api]);
    const [total, countRecords]: any = usePromise(model.count);
    const [page, findPage]: any = useTask({
      onCall: model.findAll,
      notReset: true,
    });

    const [state, pagination] = useState(initState);

    //console.log(pagination);
    //console.log({ total, page, state });
    //console.log(state.query);

    const initCount = total.result === undefined;

    useMemo(() => {
      if (initCount) {
        return () => {
          throw new Error("you can't change page");
        };
      }

      pagination.init(paginate(query, total.result));
    }, [initCount, query, total.result]);

    const refresh = useCallback(
      () => findPage(state.query),
      [findPage, state.query]
    );

    if (props.onRef) {
      props.onRef.current.refresh = refresh;
      props.onRef.current.reload = total.reset;
    }

    const count = !total.loading && !total.error && initCount;
    useEffect(() => {
      if (!count) {
        return;
      }

      const { limit, offset, ...rest } = query;

      countRecords(rest);
    }, [count, countRecords, initCount, query]);

    useEffect(() => {
      if (!state.query) {
        return;
      }

      findPage(state.query);
    }, [findPage, state.query]);

    const currentPage = state.current;
    useEffect(() => {
      if (!page.result || page.result.length || currentPage <= 1) {
        return;
      }

      pagination.deletePage();
    }, [page.result, currentPage, pagination]);

    if (total.error) {
      return <div>Unhandler Error...</div>;
    }

    if (initCount && !total.loading) {
      return null;
    }

    if (total.loading || !page.result) {
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

    return (
      <OnResult
        isLoading={page.loading}
        pages={state.pages}
        page={state.current}
        rows={page.result}
        goPage={pagination.changePage}
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

/**
 * Types
 */
interface Options<T extends unknown[], Q extends unknown[]> {
  query: Q[0];
  source: (api: IDashboard) => {
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
