import { useField, useRefForm } from "Form.v3";
import React from "react";

export default function InputDate(props: Props) {
  const {
    propertie,
    password,
    sectionName,
    listIndex,
    listName,
    ...inputProps
  } = props;

  const [state, setState] = useField({
    fieldName: propertie,
    sectionName,
    listIndex,
    listName,
  });

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
  sectionName?: string;
  listName?: string;
  listIndex?: number;
}

type CoreProps = Omit<
  JSX.IntrinsicElements["input"],
  "ref" | "onChange" | "value" | "type"
>;
