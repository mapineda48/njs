export class Proto {
  isLoading: boolean;
  error: unknown;
}

export default function initForm<T extends new () => Proto>(Proto: T): string {
  // Aquí puedes utilizar Proto para instanciar la clase, etc.
  return "Your string value"; // o cualquier operación que devuelva un string.
}


export function doFoo<T, S = TState<T>>(
  form: T,
  log?: boolean
): (init?: Partial<S> | (() => Partial<S>)) => S &
  Omit<Reducer<S, T>, InternalKey> & {
    set: (state: Partial<S>) => void;
    get: () => S;
    isLoading: boolean;
    error: unknown;
  } & ("submit" extends keyof T ? { submit: (e?: FormEvent) => void } : {});

type InternalKey = "set" | "get" | "onInit" | "submit";

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

export type TState<T> = {
  [P in NonFunctionProperties<T>]: T[P];
};

type NonFunctionProperties<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type FormEvent = React.FormEvent<HTMLFormElement>;
