import { useField } from "./Field";
import React from "react";

export default function InputCheckbox(props: Props) {
  const { fieldName, password, listIndex, ...inputProps } = props;

  const [state, setState] = useField({
    fieldName,
    listIndex,
    initialState: false,
  });

  return (
    <input
      {...inputProps}
      type="checkbox"
      checked={state ?? false}
      name={fieldName}
      onChange={({ target }) => {
        setState(target.checked);
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
