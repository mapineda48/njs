export default function initForm<
  S,
  M extends { [K: string]: (state: S, ...args: any) => S } = {},
  T extends {
    [K: string]: (state: S, ...args: any) => Promise<Partial<S>>;
  } = {}
>(form: {
  onSubmit: (state: S) => Promise<Partial<S | void>>;
  method?: M;
  thunk?: T;
  log?: boolean;
}): (initState: S | (() => S)) => S & {
  isLoading: boolean;
  error: unknown;
  submit: (e?: FormEvent) => void;
  set: (state: Partial<S>) => void;
} & {
  [K in keyof Omit<M, "submit" | "set" | "onMount">]: M[K] extends (
    state: S,
    ...args: infer A
  ) => S
    ? (...args: A) => void
    : never;
};

type FormEvent = React.FormEvent<HTMLFormElement>;

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
