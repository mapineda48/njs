export default function initForm<S, M, T>(form: {
  onSubmit: (state: S) => S | Promise<Partial<S | void>>;
  method?: M;
  thunk?: T;
  log?: boolean;
}): (initState: S | (() => S)) => S 

/**
 * Form
 */
& {
  isLoading: boolean;
  error: unknown;
  submit: (e?: FormEvent) => void;
  set: (state: Partial<S>) => void;
} & 

/**
 * Action
 */
{
  [K in keyof Omit<M, "submit" | "set" | "onMount" | keyof T>]: M[K] extends (
    state: S,
    ...args: infer A
  ) => S
    ? (...args: A) => void
    : never;
} & 

/**
 * Thunk
 */ {
  [K in keyof Omit<T, "submit" | "set" | "onMount">]: T[K] extends (
    state: S,
    ...args: infer A
  ) => Promise<Partial<S>>
    ? (...args: A) => void
    : never;
};

type FormEvent = React.FormEvent<HTMLFormElement>;

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;