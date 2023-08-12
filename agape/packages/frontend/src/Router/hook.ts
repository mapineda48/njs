import { useRef, useState, useEffect, useCallback } from "react";
import { history, parsePath, ParsePath } from "./util";

export function usePathname(opt: ParsePath) {
  const initState = () => {
    return {
      current: parsePath(opt),
    };
  };

  const [state, setState] = useState<State>(initState);
  const ref = useRef<Ref>({ opt, ...state });
  ref.current = { opt, ...state };

  // console.log(ref.current);

  useEffect(() => {
    return history.listen(() => {
      const { opt, current, baseUrl } = ref.current;

      const route = parsePath(opt);

      if (current.pattern === route.pattern) {
        return;
      }

      //Warning: if update any param in parent route are ingnore
      if (baseUrl?.test(route.pathname)) {
        return;
      }

      setState({ current: route });
    });
  }, []);

  const setBaseUrl = useCallback((baseUrl: RegExp) => {
    setState((state) => ({ ...state, baseUrl }));
  }, []);

  return [state.current, setBaseUrl] as const;
}

/**
 * Types
 */
interface Ref extends State {
  opt: ParsePath;
}

interface State {
  baseUrl?: RegExp;
  current: {
    pathname: string;
    param: {};
    pattern?: string;
  };
}
