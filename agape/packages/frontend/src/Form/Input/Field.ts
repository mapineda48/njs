import { useForm } from "..";
import { useSection } from "./Section";
import { useEffect, useMemo, useRef, useState } from "react";

export function useField(props: OptField) {
  const sectionName = useSection();
  const { current } = useForm();
  const state = useRef(null);

  const { fieldName, onChange: cb, listIndex, initialState } = props;

  let form = sectionName ? current[sectionName] : current;

  if (Array.isArray(form) && listIndex !== undefined) {
    form = form[listIndex];
  }

  const [value, setValue] = useState<any>(form[fieldName] ?? initialState);
  state.current = value;

  const memo = useMemo(() => {
    return {
      getField(): any {
        return state.current;
      },
      setField(val: any): any {
        setValue(cb ? cb(val) : val);
      },
    };
  }, [cb]);

  const { getField, setField } = memo;

  useMemo(() => {
    if (form[fieldName] === state.current) {
      return;
    }

    setField(form[fieldName]);
  }, [form, fieldName, setField]);

  useEffect(() => {
    let getState: any = getField;
    let setState: any = setField;

    Object.defineProperty(form, fieldName, {
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
      delete form[fieldName];
    };
  }, [fieldName, form, getField, setField]);

  return [value, setField];
}

/**
 * Types
 */

interface OptField {
  fieldName: string;
  listIndex?: number;
  onChange?: (val: any) => any;
  initialState?: unknown;
}
