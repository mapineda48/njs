import { useFormContext } from "react-hook-form";
import type { RegisterOptions } from ".";

export default function TextArea(props: Props) {
  const { register } = useFormContext();

  const { style, className, name, id, rows, defaultValue, ...opt } = props;

  return (
    <textarea
      rows={rows}
      id={id}
      style={style}
      className={className}
      defaultValue={defaultValue}
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
  JSX.IntrinsicElements["textarea"],
  "style" | "className" | "id" | "rows" | "defaultValue"
>;
