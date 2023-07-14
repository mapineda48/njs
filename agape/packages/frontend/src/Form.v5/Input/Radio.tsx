import { useField } from "./Field";
import React from "react";

const Context = React.createContext<any>(null);

export function InputRadio(props: PropsChild) {
  const { value, ...inputProps } = props;
  const [state, setState] = React.useContext(Context);

  return (
    <input
      {...inputProps}
      name={value}
      type={"radio"}
      value={value}
      checked={state?.toString() === value}
      onChange={({ target }) => {
        setState(target.value);
      }}
    />
  );
}

export default function InputRadios(props: Props) {
  const { fieldName, listIndex, int, boolean } = props;

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

  const field = useField({
    fieldName,
    listIndex,
    onChange: cb,
  });

  return <Context.Provider value={field}>{props.children}</Context.Provider>;
}

/**
 * Types
 */

interface Props {
  fieldName: string;
  children: React.ReactNode;
  boolean?: boolean;
  int?: boolean;
  listIndex?: number;
}

interface PropsChild extends CoreProps {
  value: string;
}

type CoreProps = Omit<
  JSX.IntrinsicElements["input"],
  "ref" | "onChange" | "value" | "type"
>;
