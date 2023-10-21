export default function InputCheckBox(props: Props) {
  const { proxy, id, ...rest } = props;

  const key = id ?? "";

  return (
    <input
      {...rest}
      type="checkbox"
      id={id}
      checked={proxy[key]}
      onChange={({ currentTarget: { checked } }) => {
        proxy[key] = checked;
      }}
    />
  );
}

/**
 * Types
 */
interface Props extends Core {
  proxy?: any;
}

type Core = Omit<
  JSX.IntrinsicElements["input"],
  "ref" | "onChange" | "value" | "type"
>;
