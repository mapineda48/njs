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

      //Warning: if update any param in parent route are ingnore
      if (baseUrl?.test(route.pathname)) {
        return;
      }

      setState(route);
      delete ref.current.baseUrl;
    });
  }, []);

  const setBaseUrl = useCallback((baseUrl: RegExp) => {
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
  baseUrl?: RegExp;
}

interface State {
  pathname: string;
  param: {};
  pattern?: string;
}
