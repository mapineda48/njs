import { useField } from "./Field";
import React from "react";

export default function InputText(props: Props) {
  const { fieldName, password, listIndex, ...inputProps } = props;

  const [state, setState] = useField({
    fieldName,
    listIndex,
  });

  const value = state ?? "";

  return (
    <input
      {...inputProps}
      type={password ? "password" : "text"}
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
  password?: boolean;
  listIndex?: number;
}

type CoreProps = Omit<
  JSX.IntrinsicElements["input"],
  "ref" | "onChange" | "value" | "type"
>;
