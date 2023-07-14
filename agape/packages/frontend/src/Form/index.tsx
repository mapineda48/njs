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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const set = React.useMemo(() => JSON.parse(JSON.stringify(props.state)), []);

  const ref = React.useRef<any>({ state: props.state, set: {} });

  return (
    <ContextForm.Provider value={ref}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.onSubmit(ref.current);
        }}
      >
        {props.children}
      </form>
    </ContextForm.Provider>
  );
}

export function useFormField(propertyKey: string, cb?: (val: any) => any) {
  const ref = useRefForm();
  const [state, setState] = React.useState<any>(
    ref.current.state[propertyKey] ?? ""
  );

  const setField = React.useCallback(
    (val: any) => {
      setState((ref.current.state[propertyKey] = cb ? cb(val) : val));
    },
    [cb, propertyKey, ref]
  );

  React.useEffect(() => {
    const { set, state } = ref.current;

    Object.defineProperty(set, propertyKey, {
      configurable: true,
      set: setField,
      get: function () {
        return state[propertyKey];
      },
    });

    return () => {
      delete set[propertyKey];
    };
  }, [propertyKey, ref, setField]);

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
