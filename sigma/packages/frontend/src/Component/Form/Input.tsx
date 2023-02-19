import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { RegisterOptions } from ".";

export default function Input(props: Props) {
  const { register, unregister } = useFormContext();

  const {
    style,
    className,
    name,
    type,
    checked,
    id,
    value,
    placeholder,
    ...opt
  } = props;

  useEffect(() => () => unregister(name), [name, unregister]);

  return (
    <input
      type={type}
      style={style}
      className={className}
      checked={checked}
      id={id}
      value={value}
      placeholder={placeholder}
      {...register(name, opt)}
    />
  );
}

/**
 * Types
 */

type Props = BaseProps & RegisterOptions;

interface BaseProps extends CoreProps {
  name: string;
}

type CoreProps = Pick<
  JSX.IntrinsicElements["input"],
  "style" | "className" | "type" | "checked" | "id" | "value" | "placeholder"
>;
