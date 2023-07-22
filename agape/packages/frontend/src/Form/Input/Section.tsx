import { parseForm, setForm } from "Form/util";
import { useForm } from "..";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const Context = createContext("");

export function useSection() {
  return useContext(Context);
}

export function SectionProvider(props: Props) {
  const sectionName = useContext(Context);

  useEffect(() => {
    if (!sectionName) {
      return;
    }

    throw new Error("Unsupport nested sections");
  });

  return (
    <Context.Provider value={props.fieldName}>
      {props.children}
    </Context.Provider>
  );
}

export default function Section(props: Props) {
  const { fieldName, children } = props;

  const { current } = useForm();

  if (!current[fieldName]) {
    current[fieldName] = {};
  }

  const ref = useRef(
    useMemo(() => setForm(current[fieldName]), [current, fieldName])
  );

  const memo = useMemo(() => {
    return {
      getField() {
        return ref.current;
      },

      setField() {
        throw new Error("Unsopport set section");
      },
    };
  }, []);

  const { getField, setField } = memo;

  useEffect(() => {
    let getState: any = getField;
    let setState: any = setField;

    Object.defineProperty(current, fieldName, {
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
      Object.defineProperty(current, fieldName, { value: {} });
    };
  }, [current, fieldName, getField, setField]);

  return <SectionProvider fieldName={fieldName}>{children}</SectionProvider>;
}

export function SectionArray(props: PropsArray) {
  const { fieldName, children } = props;
  const { current } = useForm();
  const state = useRef(null);

  if (!current[fieldName]) {
    current[fieldName] = [];
  }

  const [list, setList] = useState(current[fieldName]);
  state.current = list;

  const memo = useMemo(() => {
    return {
      getField() {
        return parseForm(state.current);
      },

      setField(value: any[]) {
        const state = JSON.parse(JSON.stringify(value));

        setList(state.map(setForm));
      },
    };
  }, []);

  const { getField, setField } = memo;

  useEffect(() => {
    let getState: any = getField;
    let setState: any = setField;

    Object.defineProperty(current, fieldName, {
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
      Object.defineProperty(current, fieldName, { value: [] });
    };
  }, [current, fieldName, getField, setField]);

  return (
    <SectionProvider fieldName={fieldName}>
      {list.map(children)}
    </SectionProvider>
  );
}

/**
 * Types
 */

interface PropsArray {
  children: (val: any, index: number) => ReactNode;
  fieldName: string;
}

interface Props {
  children: ReactNode;
  fieldName: string;
}
