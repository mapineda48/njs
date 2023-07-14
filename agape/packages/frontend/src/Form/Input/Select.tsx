import { useField } from "./Field";
import React from "react";

export default function InputSelect(props: Props) {
  const { fieldName, listIndex, int, boolean, defaultValue, ...inputProps } =
    props;

  const cb = React.useCallback(
    (value: string) => {
      if (boolean) {
        return value === "true";
      }

      if (int) {
        return parseInt(value);
      }

      return value;
    },
    [boolean, int]
  );

  const [state, setState] = useField({
    fieldName,
    listIndex,
    onChange: cb,
  });

  React.useMemo(() => {
    if (defaultValue === undefined) {
      return;
    }

    setState(defaultValue);
  }, [defaultValue, setState]);

  const value = state?.toString() ?? "";

  return (
    <select
      {...inputProps}
      defaultValue={value}
      onChange={({ target }) => {
        console.log(target.value);
        setState(target.value);
      }}
    />
  );
}

/**
 * Types
 */

interface Props extends CoreProps {
  fieldName: string;
  boolean?: boolean;
  int?: boolean;
  listIndex?: number;
}

type CoreProps = Omit<
  JSX.IntrinsicElements["select"],
  "ref" | "onChange" | "value" | "type" | "multiple"
>;
