import { useRefForm } from "Form";
import React from "react";

export default function InputDate(props: Props) {
  const { propertie, ...inputProps } = props;

  const ref = useRefForm();
  const [state, setState] = React.useState<any>(ref.current.state[propertie] ?? "");

  console.log(state);

  return (
    <input
      {...inputProps}
      type="number"
      value={state.toString()}
      onChange={({ target }) => {
        const value = parseInt(target.value);

        const state = (ref.current.state[propertie] = value ?? target.value);

        setState(state);
      }}
    />
  );
}

/**
 * Types
 */

interface Props extends CoreProps {
  propertie: string;
}

type CoreProps = Omit<
  JSX.IntrinsicElements["input"],
  "ref" | "onChange" | "value" | "type"
>;
