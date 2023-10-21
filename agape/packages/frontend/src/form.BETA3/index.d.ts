export default function initForm<R = {}, T = {}>(form: {
  reducer?: R;
  thunk?: T;
  log?: boolean;
}): UseForm<State<R & T>, R, T>;

type State<T> = T extends {
  [K: string]: (state: infer S, ...args: any[]) => any;
}
  ? S
  : {};

type UseForm<S, R, T> = "onInit" extends keyof R
  ? (initState?: S | (() => S)) => Form<S, R, T>
  : (initState: S | (() => S)) => Form<S, R, T>;

/**
 * Form Proxy
 */
type SkipMethod = "submit" | "set" | "get" | "onInit";

type Form<S, R, T> = S & {
  isLoading: boolean;
  error?: unknown;
  set: (state: Partial<S>) => void;
  get: () => State;
} & {
  [K in keyof Omit<R, SkipMethod | keyof T>]: R[K] extends (
    state: S,
    ...args: infer A
  ) => S
    ? (...args: A) => void
    : never;
} & {
  [K in keyof Omit<T, SkipMethod>]: T[K] extends (
    state: S,
    ...args: infer A
  ) => Promise<Partial<S>>
    ? (...args: A) => void
    : never;
} & ("submit" extends keyof T ? { submit: (e?: FormEvent) => void } : {});

type FormEvent = React.FormEvent<HTMLFormElement>;
