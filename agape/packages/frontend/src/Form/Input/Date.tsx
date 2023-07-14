import { useRefForm } from "Form";
import React from "react";

export default function InputDate(props: Props) {
  const { propertie, timeLocal, ...inputProps } = props;

  const ref = useRefForm();
  const [state, setState] = React.useState<any>(
    ref.current.state[propertie] ?? ""
  );

  return (
    <input
      {...inputProps}
      type={!timeLocal ? "date" : "datetime-local"}
      value={
        !timeLocal && state.toDateString
          ? state.toDateString()
          : timeLocal && state.toDateTimeString
          ? state.toDateTimeString()
          : state
      }
      onChange={({ target }) => {
        let value = target.value;

        if (value && !timeLocal) {
          value = value + "T00:00";
        }

        const state = (ref.current.state[propertie] = value
          ? new Date(value)
          : value);

        console.log({ value, state });

        setState(state);
      }}
    />
  );
}

/**
 * Types
 */

interface Props extends CoreProps {
  timeLocal?: boolean;
  propertie: string;
}

type CoreProps = Omit<
  JSX.IntrinsicElements["input"],
  "ref" | "onChange" | "value" | "type"
>;
