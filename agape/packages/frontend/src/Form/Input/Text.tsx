import { useFormField, useRefForm } from "Form";
import React from "react";

export default function InputDate(props: Props) {
  const { propertie, password, ...inputProps } = props;

  const [state, setState] = useFormField(propertie)

  return (
    <input
      {...inputProps}
      type={password ? "password" : "text"}
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
  propertie: string;
  password?: string;
}

type CoreProps = Omit<
  JSX.IntrinsicElements["input"],
  "ref" | "onChange" | "value" | "type"
>;
