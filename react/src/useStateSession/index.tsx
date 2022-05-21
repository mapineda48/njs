import React from "react";


export function useStateSession<T>(key: string, val: T | (() => T)) {
  const [state, setState] = React.useState<T>(() => {
    const cache = sessionStorage.getItem(key);

    if (!cache) {
      if (typeof val === "function") {
        return (val as any)();
      }

      return val;
    }

    return JSON.parse(cache);
  });

  const setStateWrap = React.useCallback(
    (state: T | ((state: T) => T)) => {
      setState((current) => {
        const next =
          typeof state !== "function" ? state : (state as any)(current);

        const cache = JSON.stringify(next);

        sessionStorage.setItem(key, cache);

        return next;
      });
    },
    [key]
  );

  return [state, setStateWrap] as const;
}