import { useRef, useState, useEffect, useCallback } from "react";
import { history, parsePath, ParsePath } from "./util";

export function usePathname(opt: ParsePath) {
  const [state, setState] = useState<State>(() => parsePath(opt));
  const ref = useRef<Ref>({ opt, state });

  const { baseUrl } = ref.current;
  ref.current = { baseUrl, opt, state };

  // console.log(ref.current);

  useEffect(() => {
    return history.listen(() => {
      const { opt, state, baseUrl } = ref.current;

      const route = parsePath(opt);

      if (state.pattern === route.pattern) {
        return;
      }

      if (baseUrl && route.chunk.startsWith(baseUrl)) {
        return;
      }

      setState(route);
      delete ref.current.baseUrl;
    });
  }, []);

  const setBaseUrl = useCallback((baseUrl?: string) => {
    ref.current.baseUrl = baseUrl;
  }, []);

  return [state, setBaseUrl] as const;
}

/**
 * Types
 */
interface Ref {
  opt: ParsePath;
  state: State;
  baseUrl?: string;
}

interface State {
  chunk: string;
  pathname: string;
  param: {};
  pattern?: string;
}
