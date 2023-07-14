import React, { ReactNode } from "react";

export const ContextForm =
  React.createContext<React.MutableRefObject<any> | null>(null);

export function useRefForm() {
  const ref = React.useContext(ContextForm);

  if (!ref) {
    throw new Error("missing form ref");
  }

  return ref;
}

export default function FormProvider<T>(props: Props<T>) {
  const ref = React.useRef<any>({ state: props.state, set: {} });

  return (
    <ContextForm.Provider value={ref}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.onSubmit(ref.current.set);
        }}
      >
        {props.children}
      </form>
    </ContextForm.Provider>
  );
}

export function useField(fieldName: string, cb?: (val: any) => any) {
  const form = useRefForm();
  const [state, setState] = React.useState<any>(
    form.current.state[fieldName] ?? ""
  );

  const setField = React.useCallback(
    (val: any) => {
      setState((form.current.state[fieldName] = cb ? cb(val) : val));
    },
    [cb, fieldName, form]
  );

  React.useEffect(() => {
    const { current } = form;
    let getState: any = () => current.state[fieldName];
    let setState: any = (value: any) => setField(value);

    Object.defineProperty(current.set, fieldName, {
      configurable: true,
      set: function (value) {
        if (setState) {
          setState(value);
        }
      },
      get: function () {
        if (getState) {
          return getState();
        }
        return undefined;
      },
    });

    return () => {
      getState = null;
      setState = null;
      delete current.state[fieldName];
      delete current.set[fieldName];
    };
  }, [fieldName, form, setField]);

  return [state, setField];
}

/**
 * Types
 */

interface Props<T> {
  children: ReactNode;
  state: T;
  onSubmit: (state: T) => void;
}
