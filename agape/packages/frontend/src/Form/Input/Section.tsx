import { useRefForm } from "..";
import React, { ReactNode, useContext } from "react";

const Context = React.createContext("");

export function useSection() {
  return useContext(Context);
}

export function SectionProvider(props: Props) {
  const sectionName = React.useContext(Context);

  React.useEffect(() => {
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

  const { current } = useRefForm();

  if (!current[fieldName]) {
    current[fieldName] = {};
  }

  const ref = React.useRef(current[fieldName]);

  const memo = React.useMemo(() => {
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

  React.useEffect(() => {
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
  const { current } = useRefForm();
  const state = React.useRef(null);

  if (!current[fieldName]) {
    current[fieldName] = [];
  }

  const [list, setList] = React.useState(current[fieldName]);
  state.current = list;

  const memo = React.useMemo(() => {
    return {
      getField() {
        return state.current;
      },

      setField(value: any[]) {
        setList(JSON.parse(JSON.stringify(value)));
      },
    };
  }, []);

  const { getField, setField } = memo;

  React.useEffect(() => {
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
