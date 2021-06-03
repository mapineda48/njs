import React from "react";

import { router } from "./state";

export const useRouter = (create: Create) => {
  const [state, setState] = React.useState(() => router.create(create()));

  const pipe = React.useMemo((): Router => {
    const result: any = {};

    Object.keys(router).map((key) => {
      if (key === "create") {
        return undefined;
      }

      const current: (...args: any[]) => any = (router as any)[key];

      result[key] = (...args: any[]) =>
        setState((state) => current.call(null, state, ...args));

      return undefined;
    });

    return result;
  }, [setState]);

  return [state, pipe] as const;
};

/**
 * Typings
 */

type RouterPipe<T = typeof router> = {
  [K in keyof T]: T[K] extends (
    state: router.State<string>,
    ...args: infer A
  ) => any
    ? (...args: A) => void
    : never;
};

export type Router = Omit<RouterPipe, "create">;

export type Create = () => router.Input<string>;
