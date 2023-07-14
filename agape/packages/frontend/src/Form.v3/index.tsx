import React, { ReactNode, useMemo } from "react";

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
  const form = useMemo(
    () => JSON.parse(JSON.stringify(props.state)),
    [props.state]
  );
  const ref = React.useRef<any>({ state: props.state, form });

  return (
    <ContextForm.Provider value={ref}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.onSubmit(ref.current.form);
        }}
      >
        {props.children}
      </form>
    </ContextForm.Provider>
  );
}

export function useField(props: OptField) {
  const { current } = useRefForm();
  const { fieldName, onChange: cb, sectionName, listName, listIndex } = props;

  const state = sectionName
    ? current.state[sectionName]
    : listName
    ? current.state[listName]
    : current.state;

  const form = sectionName
    ? current.form[sectionName]
    : listName
    ? current.form[listName]
    : current.form;

  const [value, setValue] = React.useState<any>(
    listIndex !== undefined
      ? state[listIndex][fieldName]
      : state[fieldName] ?? ""
  );

  const memo = React.useMemo(() => {
    const isArray = Array.isArray(state);

    if (!isArray) {
      return {
        index: undefined,
        getField(): any {
          return state[fieldName];
        },
        setField(val: any): any {
          setValue((state[fieldName] = cb ? cb(val) : val));
        },
      };
    }

    if (listIndex === undefined) {
      throw new Error("Missing index array");
    }

    return {
      index: listIndex,
      getField(): any {
        return state[listIndex][fieldName];
      },
      setField(val: any): any {
        setValue((state[listIndex][fieldName] = cb ? cb(val) : val));
      },
    };
  }, [state, listIndex, fieldName, cb]);

  const { getField, setField, index } = memo;

  React.useEffect(() => {
    let getState: any = getField;
    let setState: any = setField;

    const _form = index ? form[index] : form;
    const _state = index ? state[index] : state;

    Object.defineProperty(index ? form[index] : form, fieldName, {
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
      delete _state[fieldName];
      delete _form[fieldName];
    };
  }, [fieldName, form, getField, index, setField, state]);

  return [value, setField];
}

/**
 * Types
 */

interface OptField {
  fieldName: string;
  listName?: string;
  listIndex?: number;
  sectionName?: string;
  onChange?: (val: any) => any;
}

interface Props<T> {
  children: ReactNode;
  state: T;
  onSubmit: (state: T) => void;
}
