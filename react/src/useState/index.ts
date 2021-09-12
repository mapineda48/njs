import React from "react";

export function storageState(key: string, storage = sessionStorage): SetState {
  return ((arg: any) => {
    const [state, setState] = React.useState(arg);

    storage.setItem(key, JSON.stringify(state));

    React.useEffect(() => {
      const cache = storage.getItem(key);

      if (cache === null) return;

      setState(JSON.parse(cache));
    }, [setState]);

    return [state, setState];
  }) as any;
}

/**
 * Types
 */
type SetState = typeof React.useState;
