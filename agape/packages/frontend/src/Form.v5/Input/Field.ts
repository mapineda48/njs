import { useRefForm } from "..";
import { useSection } from "./Section";
import React from "react";

export function useField(props: OptField) {
  const sectionName = useSection();
  const { current } = useRefForm();
  const state = React.useRef(null);

  const { fieldName, onChange: cb, listIndex } = props;

  let form = sectionName ? current[sectionName] : current;

  if (Array.isArray(form) && listIndex !== undefined) {
    form = form[listIndex];
  }

  const [value, setValue] = React.useState<any>(form[fieldName]);
  state.current = value;

  const memo = React.useMemo(() => {
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

  React.useEffect(() => {
    if (state.current !== form[fieldName]) {
      setField(form[fieldName]);
    }

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
}
