import { setForm } from "Form/util";
import { useForm } from "Form";
import { Provider } from "./Provider";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function SectionArray(props: PropsArray) {
  const { fieldName, OnItem } = props;
  const [current] = useForm();
  const ref = useRef(null);

  if (!current[fieldName]) {
    current[fieldName] = [];
  }

  const [state, setState] = useState(current[fieldName]);

  state.addItem = useCallback((...args: any[]) => {
    setState((state: any[]) => [...state, ...args.map(setForm)]);
  }, []);

  state.removeIndex = useCallback((index: number) => {
    setState((state: any[]) => {
      const next = [...state];

      next.splice(index, 1);

      return next;
    });
  }, []);

  ref.current = state;

  useMemo(() => {
    if (current[fieldName] === ref.current) {
      return;
    }

    setState(setForm(current[fieldName]));
  }, [current, fieldName]);

  const memo = useMemo(() => {
    return {
      getField() {
        return ref.current;
      },

      setField(value: any[]) {
        const state = JSON.parse(JSON.stringify(value));

        setState(state.map(setForm));
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

  return <Provider fieldName={fieldName}>{state.map(OnItem)}</Provider>;
}

/**
 * Types
 */

interface PropsArray {
  OnItem: (val: any, index: number) => ReactNode;
  fieldName: string;
}
