import { useField } from "./Field";
import React from "react";

function parseField(val: string) {
  return parseInt(val) ?? val;
}

export default function InputNumber(props: Props) {
  const { fieldName, ...inputProps } = props;

  const [state, setState] = useField({
    fieldName,
    onChange: parseField,
  });

  const value = state?.toString() ?? "";

  return (
    <input
      {...inputProps}
      type="number"
      value={value}
      onChange={({ target }) => {
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
}

type CoreProps = Omit<
  JSX.IntrinsicElements["input"],
  "ref" | "onChange" | "value" | "type"
>;
