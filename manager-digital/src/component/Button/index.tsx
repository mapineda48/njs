import clsx from "clsx";

export default function Button(props: Props) {
  const { loading, green, red, ...rest } = props;

  const className = clsx([
    rest.className,
    "button",
    "button-primary",
    green && "button-green",
    red && "button-red",
    loading && "button-loader",
  ]);

  return <button {...rest} className={className} />;
}

/**
 * Typings
 */
interface Props extends Omit<NativeProps, "ref"> {
  loading?: boolean;
  green?: boolean;
  red?: boolean;
}

type NativeProps = JSX.IntrinsicElements["button"];
