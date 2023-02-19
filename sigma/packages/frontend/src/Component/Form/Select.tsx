import { useFormContext } from "react-hook-form";
import type { RegisterOptions } from ".";

export default function Select(props: Props) {
  const { register } = useFormContext();

  const { style, className, name, children, id, disabled, ...opt } = props;

  return (
    <select
      id={id}
      style={style}
      className={className}
      disabled={disabled}
      {...register(name, opt)}
    >
      {children}
    </select>
  );
}

/**
 * Types
 */

type Props = Omit<RegisterOptions, "onChange"> & BaseProps;

interface BaseProps extends CoreProps {
  name: string;
}

type CoreProps = Pick<
  JSX.IntrinsicElements["select"],
  "style" | "className" | "children" | "id" | "onChange" | "disabled"
>;
