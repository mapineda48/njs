import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useIsMounted from "hook/useIsMounted";
import { useSession } from "App/Api/Protected/Session";
import ProtectedApi from "api/protected";
import { paginateParams } from "api/util";
import { IRequest } from "backend/integration";

/**
 * Before reviewing this component, be sure to read the project's API documentation to try
 * to understand how queries work.
 *
 * This should only be in the component tree once
 */
export default function FindAndPaginateQueryParams<T extends unknown[]>(
  props: Props<T>
) {
  /**
   * Variables
   */
  const { defaultParams, onChangePage, onFindAndCountAll, OnResult, pageSize } =
    props;
  const { pathname, search, existsSearchParams, currentPage } = getLocation();
  const defaultPage = defaultParams && pathname + defaultParams;

  /**
   * Hooks without deps
   */
  const navigate = useNavigate();
  const api = useSession();
  const isMounted = useIsMounted();
  const [state, setState] = useState(initState);

  /**
   * Hook with deps
   */

  /**
   * Api Page
   */
  const { changePage, findAndCountAll } = useMemo(() => {
    const findAndCountAll = onFindAndCountAll(api);
    const changePage = onChangePage(api);

    return { findAndCountAll, changePage };
  }, [api, onChangePage, onFindAndCountAll]);

  /**
   * if there are no parameters in the url and the component props have default parameters
   * then redirect the url with these
   */
  useEffect(() => {
    if (existsSearchParams || !defaultPage) {
      return;
    }
    navigate(defaultPage);
  }, [defaultPage, existsSearchParams, navigate]);

  /**
   * whenever that state has a redirect index, it means the current page is empty and
   * it will try to redirect to a page that maybe has rows
   */
  const { pages, redirectIndex } = state;

  const existsRedirect = Boolean(redirectIndex);
  const isSyncIndex = currentPage === pages[redirectIndex];
  const inRedirect = existsRedirect && !isSyncIndex;
  const redirectPage = inRedirect && pages[redirectIndex];

  useEffect(() => {
    if (!redirectPage) {
      return;
    }
    navigate(redirectPage);
  }, [navigate, redirectPage]);

  /**
   * Before loading the external component that is passed through the props,
   * use the query that finds parameters and counts the total rows to start the pagination.
   */
  const skipCountPages =
    existsRedirect || !existsSearchParams || pages.includes(currentPage);

  useEffect(() => {
    if (skipCountPages) {
      return;
    }

    const location = getLocation();
    const { search } = location;

    const request = findAndCountAll(search);

    request
      .then(({ rows, count }) => ({
        rows,
        pages: paginateParams(location, pageSize, count),
      }))
      .then(({ rows, pages }) => {
        isMounted() &&
          setState((state) => ({
            ...state,
            search,
            rows,
            pages,
            redirectIndex:
              !rows.length && pages.length > 1 ? pages.length - 1 : 0,
          }));
      })
      .catch((error) => {
        isMounted() &&
          setState((state) => ({
            ...state,
            search,
            error,
          }));
      });

    return () => request.abort();
  }, [api, findAndCountAll, isMounted, pageSize, skipCountPages]);

  /**
   * At this point you just need to load rows in the page query
   */
  const isSyncSearch = state.search === search && !state.isReloadSearch;
  const isReadyPage =
    inRedirect || !skipCountPages || !existsSearchParams || isSyncSearch;

  useEffect(() => {
    if (isReadyPage) {
      return;
    }

    const { search } = getLocation();

    const request = changePage(search);

    request
      .then((rows) => {
        isMounted() &&
          setState(({ pages, redirectIndex, ...res }) => ({
            ...res,
            search,
            rows,
            isReloadSearch: false,

            /**
             * If there is a redirect index, it means the last page was empty,
             * you need to delete it
             */
            pages: redirectIndex ? removePages(pages, redirectIndex) : pages,

            /**
             * Check if the new page is empty and there are pages to redirect,
             * set the redirect index to remove this page if it is empty
             */
            redirectIndex:
              !rows.length && pages.length > 1 ? pages.length - 2 : 0,
          }));
      })
      .catch((error) => {
        isMounted() &&
          setState((state) => ({
            ...state,
            search,
            error,
            isReloadSearch: false,
          }));
      });

    return () => request.abort();
  }, [api, changePage, isMounted, isReadyPage]);

  /**
   * Allow page refresh from an external component
   */
  const refreshPage = useCallback(
    () => setState((state) => ({ ...state, isReloadSearch: true })),
    []
  );

  /**
   * Temp components
   */
  if (!state.rows && search) {
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

  if (state.error) {
    console.log(state.error);
    return <div>Unhandler Error...</div>;
  }

  if (!state.search) {
    return null;
  }

  return (
    <OnResult
      isLoading={!isReadyPage}
      pages={pages}
      page={currentPage}
      rows={state.rows as any}
      refreshPage={refreshPage}
    />
  );
}

function getLocation() {
  const { pathname, search } = window.location;
  const existsSearchParams = Boolean(search);
  const currentPage = pathname + search;

  return { pathname, search, existsSearchParams, currentPage };
}

function removePages(pages: string[], index: number) {
  const res = [...pages];
  res.length = index + 1;
  return res;
}

export function initState(): State {
  return {
    search: "",
    error: null,
    rows: null,
    isReloadSearch: false,
    pages: [],
    redirectIndex: 0,
  };
}

/**
 * Types
 */
interface State {
  search: string;
  error: any;
  rows: unknown[] | null;
  pages: string[];
  isReloadSearch: boolean;
  redirectIndex: number;
}

interface Props<T extends unknown[]> {
  pageSize: number;
  defaultParams: string;
  onFindAndCountAll: (
    api: ProtectedApi
  ) => (params: string) => IRequest<{ rows: T; count: number }>;
  onChangePage: (api: ProtectedApi) => (params: string) => IRequest<T>;
  OnResult: (props: ResultProps<T>) => JSX.Element;
}

export interface ResultProps<T extends unknown[]> {
  isLoading: boolean;
  page: string;
  pages: string[];
  rows: T;
  refreshPage: () => void;
}
