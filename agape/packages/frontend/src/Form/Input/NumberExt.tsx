import { useFormField, useRefForm } from "Form";
import React from "react";

function parseField(val: string) {
  return parseInt(val) ?? val;
}

export default function InputDate(props: Props) {
  const { fieldName: propertie, ...inputProps } = props;

  const [state, setState] = useFormField(propertie, parseField);

  return (
    <input
      {...inputProps}
      type="number"
      value={state.toString()}
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
