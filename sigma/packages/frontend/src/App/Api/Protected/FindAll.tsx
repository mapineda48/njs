import useIsMounted from "hook/useIsMounted";
import React, { useEffect } from "react";
import ProtectedApi from "api/protected";
import { useSession } from "./Session";

export default function FindAll<T>(props: Props<T>) {
  const api = useSession();

  const isMounted = useIsMounted();

  /**
   * State Request
   */
  const [state, setState] = React.useState(initState);

  const refresh = React.useCallback(() => setState(initState), []);

  const findAll = !state.finally && props.loadFromApi;

  useEffect(() => {
    if (!findAll) {
      return;
    }
    setState((state) => ({ ...state, isLoading: true }));

    const promise = api.multi(findAll);

    promise
      .then((result) => {
        isMounted() &&
          setState((state) => ({
            ...state,
            isLoading: false,
            finally: true,
            result,
          }));
      })
      .catch((error) => {
        isMounted() &&
          setState((state) => ({
            ...state,
            isLoading: false,
            finally: true,
            error,
          }));
      });

    /**
     * If component is unmount cancel request
     */
    return () => promise.abort();
  }, [api, findAll, isMounted]);

  if (findAll) {
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
    return <div>Error...</div>;
  }

  if (!state.finally) {
    return null;
  }

  const { OnResult } = props;

  return <OnResult refresh={refresh} data={state.result} />;
}

export function initState(): State {
  return {
    finally: false,
    error: null,
    result: undefined,
  };
}

/**
 * Types
 */
interface State {
  finally: boolean;
  error: any;
  result: any;
}

interface Props<T> {
  loadFromApi: (api: ProtectedApi) => Promise<T>;
  OnResult: (props: ResultProps<T>) => JSX.Element;
}

export interface ResultProps<T> {
  data: T;
  refresh: () => void;
}
