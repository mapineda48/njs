import type { AxiosError as FormError } from "axios";

export type { FormError };

export default function initForm<T, S = State<T>>(
  form: T,
  log?: boolean
): (init?: Partial<S> | (() => Partial<S>)) => S &
  Omit<Reducer<S, T>, InternalKey> & {
    set: (state: Partial<S>) => void;
    get: () => S;
    isLoading: boolean;
  } & ("submit" extends keyof T ? { submit: (e?: FormEvent) => void } : {});

type InternalKey = "set" | "get" | "submit" | "onInit" | "onError";

type Reducer<S, R> = {
  [K in IsReducer<S, R>]: R[K] extends (...args: infer A) => any
    ? (...args: A) => void
    : never;
};

type IsReducer<S, R> = {
  [K in keyof R]: R[K] extends (
    ...args: any[]
  ) => void | Promise<Partial<S> | void> | ((state: S) => S)
    ? K
    : never;
}[keyof R];

export type State<T> = {
  [P in NonFunctionProperties<T>]: T[P];
};

type NonFunctionProperties<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type FormEvent = React.FormEvent<HTMLFormElement>;

export type FormState<T> = State<T>;
