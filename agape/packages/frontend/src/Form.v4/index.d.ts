import { Session } from "backend/api/rpc/agape";

export type Action<S, R> = {
  readonly [K in keyof R]: R[K] extends (state: S, ...args: infer A) => S
    ? (...args: A) => Action<S, R>
    : never;
};

/**
 * Allow use reducers
 */
export default function initForm<T, R>(
  submit: T,
  reducer: R
): T extends (api: Session, state: infer S) => Promise<infer D>
  ? R extends { [K: string]: (state: S, ...args: any) => S }
    ? (initState: S | (() => S)) => S & FormSubmit<D> & Action<S, R>
    : never
  : never;

/**
 * Allow Handler Submit Event
 */
export default function initForm<S, R>(
  submit: (api: Session, state: S) => Promise<R>
): (initState: S | (() => S)) => S & FormSubmit<R>;

interface FormSubmit<T> {
  
  submit: (e: FormEvent) => void;
  isLoading: boolean;
  error: unknown;
  result?: T;
}

type FormEvent = React.FormEvent<HTMLFormElement>;

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
