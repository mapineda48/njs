import { setForm } from "Form/util";
import { useForm } from "Form";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Provider, Props } from "./Provider";

export default function Section(props: Props) {
  const { fieldName, children } = props;
  const [current] = useForm();
  const ref = useRef(null);

  if (!current[fieldName]) {
    current[fieldName] = setForm();
  }

  const [state, setState] = useState(current[fieldName]);
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

        setState(setForm(state));
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

  return <Provider fieldName={fieldName}>{children}</Provider>;
}
