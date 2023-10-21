export default function initForm<
  T extends { [K: string]: unknown },
  R = Omit<T, "submit">,
  Z = T["submit"]
>(
  reducer: T
): R extends { [key: string]: (state: infer S, ...args: infer A) => any }
  ? R extends { [key: string]: (state: S, ...args: A) => S }
    ? Z extends (state: S) => Promise<infer W>
      ? (initState: S | (() => S)) => S &
          Action<S, R> & {
            isLoading: boolean;
            error: unknown;
            result?: W;
            submit: () => void;
          }
      : (initState: S | (() => S)) => S & Action<S, R>
    : never
  : never;

export type Action<S, R> = {
  readonly [K in keyof R]: R[K] extends (state: S, ...args: infer A) => S
    ? (...args: A) => Action<S, R>
    : never;
};
