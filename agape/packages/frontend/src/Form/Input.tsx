import { useRefForm } from "Form";
import React from "react";

export function Input(props: Props) {
  const { onChange, ...inputProps } = props;

  const ref = useRefForm();
  const [state, setState] = React.useState<any>("");

  console.log(state);

  return (
    <input
      {...inputProps}
      value={parseIfDate(state, props.type)}
      onChange={({ target }) => {
        const value = setTimeIfDate(target.value, props.type);

        const state = onChange(ref.current.state, value);

        setState(state);
      }}
    />
  );
}

function setTimeIfDate(value: string, type = "") {
  if (!(type === "date")) {
    return value;
  }

  return value + "T00:00";
}

function parseIfDate(date: any, type = "") {
  if (!(date instanceof Date)) {
    return date;
  }

  if (type === "datetime-local") {
    return date.toDateTimeString();
  }

  return date.toDateString();
}

/**
 * Types
 */

interface Props extends CoreProps {
  onChange: (ref: any, value: any) => any;
}

type CoreProps = Omit<
  JSX.IntrinsicElements["input"],
  "ref" | "onChange" | "value"
>;
