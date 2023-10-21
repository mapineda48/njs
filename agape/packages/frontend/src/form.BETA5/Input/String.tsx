export default function InputString(props: Props) {
  const { proxy, password, id, ...rest } = props;

  const key = id ?? "";

  return (
    <input
      {...rest}
      type={password ? "password" : "text"}
      id={id}
      value={proxy[key]}
      onChange={({ currentTarget: { value } }) => {
        proxy[key] = value;
      }}
    />
  );
}

/**
 * Types
 */
interface Props extends Core {
  password?: boolean;
  proxy?: any;
}

type Core = Omit<
  JSX.IntrinsicElements["input"],
  "ref" | "onChange" | "value" | "type"
>;
