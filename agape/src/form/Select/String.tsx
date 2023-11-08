
export default function Text(props: Props) {
  return <select {...props} />;
}

/**
 * Types
 */

interface Props extends Omit<Native, "ref" | "type"> {
  name: string;
  onRef?: OnRef;
}

type OnRef = Native["ref"];
type Native = JSX.IntrinsicElements["select"];
