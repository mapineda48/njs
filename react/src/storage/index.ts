import React from "react";
import { isFunc } from "../useAction";

export function createStorage<S = any>(key: string, storage = sessionStorage) {
  const instance = {
    get(): S | null {
      const state = storage.getItem(key);

      if (!state) return null;

      return JSON.parse(state);
    },
    set(state: S) {
      storage.setItem(key, JSON.stringify(state));

      return state;
    },

    remove() {
      storage.removeItem(key);
    },
  };

  const useState: UseState = ((value: any) => {
    const [state, setState] = React.useState(value);

    const setStateWrap: any = React.useCallback(
      function storageState(state: any) {
        return setState((current: any) =>
          instance.set(isFunc(state) ? state(current) : state)
        );
      },
      [setState]
    );

    return [state, setStateWrap] as any;
  }) as any;

  return { ...instance, useState };
}

export default createStorage;

/**
 * Types
 */
type UseState = typeof React.useState;
