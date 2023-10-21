import { Session } from "backend/api/rpc/agape";

export default function initForm<S, M>(form: {
  onSubmit: (state: S, api: Session) => Promise<Partial<S | void>>;
  onValidate: (state: S) => S | void;
  reducer: M;
  log?: boolean;
}): M extends { [K: string]: (state: S, ...args: any) => S }
  ? (initState: S | (() => S)) => S & {
      isLoading: boolean;
      error: unknown;
      submit: (e: FormEvent) => void;
      set: (state: Partial<S>) => void;
    } & {
      [K in keyof Omit<M, "submit" | "set">]: M[K] extends (
        state: S,
        ...args: infer A
      ) => S
        ? (...args: A) => void
        : never;
    }
  : never;

export default function initForm<S, M>(form: {
  onSubmit: (state: S, api: Session) => Promise<Partial<S | void>>;
  reducer: M;
  log?: boolean;
}): M extends { [K: string]: (state: S, ...args: any) => S }
  ? (initState: S | (() => S)) => S & {
      isLoading: boolean;
      error: unknown;
      submit: (e: FormEvent) => void;
      set: (state: Partial<S>) => void;
    } & {
      [K in keyof Omit<M, "submit" | "set">]: M[K] extends (
        state: S,
        ...args: infer A
      ) => S
        ? (...args: A) => void
        : never;
    }
  : never;

export default function initForm<S>(form: {
  onSubmit: (state: S, api: Session) => Promise<Partial<S | void>>;
  onValidate: (state: S) => S | void;
  log?: boolean;
}): (initState: S | (() => S)) => S & {
  isLoading: boolean;
  error: unknown;
  submit: (e: FormEvent) => void;
  set: (state: Partial<S>) => void;
};

export default function initForm<S>(form: {
  onSubmit: (state: S, api: Session) => Promise<Partial<S | void>>;
  log?: boolean;
}): (initState: S | (() => S)) => S & {
  isLoading: boolean;
  error: unknown;
  submit: (e: FormEvent) => void;
  set: (state: Partial<S>) => void;
};

type FormEvent = React.FormEvent<HTMLFormElement>;

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
