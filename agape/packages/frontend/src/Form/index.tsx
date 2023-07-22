import React, { DependencyList, ReactNode, useMemo } from "react";
import { isForm, parseForm, setForm } from "./util";

export const Submit = React.createContext<React.MutableRefObject<any> | null>(
  null
);

export function useSubmit<S = any>(
  onSubmit: (form: S) => void,
  deps?: DependencyList
) {
  const cb = React.useContext(Submit);

  React.useEffect(() => {
    if (!cb) {
      return;
    }

    if (cb.current && cb.current !== onSubmit) {
      throw new Error("Only supports one submit handler");
    }

    cb.current = onSubmit;

    return () => {
      cb.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export const Form = React.createContext<React.MutableRefObject<any> | null>(
  null
);

export function useForm() {
  const ref = React.useContext(Form);

  if (!ref) {
    throw new Error("Missing form context");
  }

  return ref;
}

export default function FormProvider<T>(props: Props<T>) {
  const { state } = props;
  const ref = React.useRef<any>(useMemo(() => setForm(state), [state]));

  const onSubmit = React.useRef<any>(props.onSubmit);

  return (
    <Submit.Provider value={onSubmit}>
      <Form.Provider value={ref}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const data = parseForm(ref.current);
            onSubmit?.current(data);
          }}
        >
          {props.children}
        </form>
      </Form.Provider>
    </Submit.Provider>
  );
}

/**
 * Types
 */

interface Props<T> {
  children: ReactNode;
  state?: T;
  onSubmit?: (state: T) => void;
}
