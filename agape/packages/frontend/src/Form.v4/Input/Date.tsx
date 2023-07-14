import { useField } from "./Field";
import React from "react";

export default function InputDate(props: Props) {
  const { fieldName, timeLocal, ...inputProps } = props;

  const parseField = React.useCallback(
    (value: Date | string) => {
      if (!value) {
        return value;
      }

      if (value instanceof Date) {
        return value;
      }

      if (timeLocal) {
        return new Date(value);
      }

      return new Date(value + "T00:00");
    },
    [timeLocal]
  );

  const [state, setState] = useField({
    fieldName,
    onChange: parseField,
  });

  const value = !state
    ? state
    : !timeLocal
    ? state.toDateString()
    : state.toDateTimeString();

  return (
    <input
      {...inputProps}
      type={!timeLocal ? "date" : "datetime-local"}
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
  timeLocal?: boolean;
}

type CoreProps = Omit<
  JSX.IntrinsicElements["input"],
  "ref" | "onChange" | "value" | "type"
>;
