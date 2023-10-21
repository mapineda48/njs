import { useMemo, useRef, useState } from "react";
import DateForm from "./DateForm";
import createProxy from "./proxy";

export function String(e: InputForm) {
  const { value } = e.currentTarget;
  return (state: string) => value;
}

export function Int(e: InputForm) {
  const { value } = e.currentTarget;
  return (state: number) => parseInt(value);
}

export function Checked(e: InputForm) {
  const { checked = false } = e.currentTarget as any;
  return (state: boolean) => checked;
}

export function Date(e: InputForm) {
  const { value } = e.currentTarget;
  return (state: DateForm) => new DateForm(value);
}

export function DateTime(e: InputForm) {
  const { value } = e.currentTarget;
  return (state: DateForm) => new DateForm(value, true);
}

function initField(cb: unknown) {
  if (cb === Int) {
    return 0;
  }

  if (cb === String) {
    return "";
  }

  if (cb === Checked) {
    return false;
  }

  if (cb === Date) {
    return new DateForm("");
  }

  if (cb === DateTime) {
    return new DateForm("", true);
  }
}

function initForm(field: any) {
  const keys = Object.keys(field);
  const entriess = Object.entries(field);

  const create = (setState: any) => {
    return Object.fromEntries(
      entriess.map(([key, fn]: any) => [
        key,
        (e: InputForm) => {
          const cb = fn(e);
          setState((state: any) => ({ ...state, [key]: cb(state[key]) }));
        },
      ])
    );
  };

  const initValue = () =>
    Object.fromEntries(keys.map((key) => [key, initField(field[key])]));

  /**
   * return react hook
   */
  return function useForm(initState: any) {
    const [state, setState] = useState(initState ?? initValue);
    const ref = useRef(state);
    ref.current = state;

    const form = useMemo(() => create(setState), []);
    const proxy = useMemo(() => createProxy(ref, setState), []);

    return [proxy, form];
  };
}

export default initForm as InitForm;

/**
 * Types
 */

type InputForm =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

type InitForm = <T extends Field>(
  field: T
) => <S extends State<T> = State<T>>(state?: S) => [S, Form<T>];

type Form<T extends Field> = {
  [K in keyof T]: (e: InputForm) => void;
};

type State<T extends Field> = {
  [K in keyof T]: FieldType<T[K]>;
};

type FieldType<T> = T extends (e: InputForm) => (state: infer A) => unknown
  ? T extends (e: InputForm) => (state: A) => A
    ? A
    : never
  : never;

type Field = {
  [K: string]: (
    e: InputForm
  ) =>
    | ((state: number) => number)
    | ((state: string) => string)
    | ((state: boolean) => boolean)
    | ((state: DateForm) => DateForm);
};
