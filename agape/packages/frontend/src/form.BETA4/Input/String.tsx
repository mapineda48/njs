import { useCallback, useEffect, useRef } from "react";
import { Tooltip } from "bootstrap";

function useToolTip<T extends Element>(content?: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!content || !ref.current) {
      return;
    }

    // Initialize tooltip for button
    const current = new Tooltip(ref.current);

    // Show the tooltip
    current.show();

    return () => {
      // Clean up tooltip when component is unmounted
      current.dispose();
    };
  }, [content]);

  return ref;
}

export default function InputString(props: Props) {
  const { proxy, password, id, tooltip, ...rest } = props;

  const key = id ?? "";

  const onChange = useCallback(
    ({ currentTarget }: ChangeEvent) => {
      proxy[key] = currentTarget.value;
    },
    [proxy, key]
  );

  const ref = useToolTip<HTMLInputElement>(tooltip);

  return (
    <input
      {...rest}
      title={tooltip || rest.title}
      type={password ? "password" : "text"}
      id={id}
      value={proxy[key]}
      ref={ref}
      onChange={onChange}
    />
  );
}

/**
 * Types
 */
interface Props extends Core {
  password?: boolean;
  proxy?: any;
  tooltip?: string;
}

type Core = Omit<
  JSX.IntrinsicElements["input"],
  "ref" | "onChange" | "value" | "type"
>;

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
