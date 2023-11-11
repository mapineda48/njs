import { type } from "../parse";

export default function Float(props: Props) {
  return <select {...props} name={type.float(props.name)} />;
}

/**
 * Typess
 */

interface Props extends Omit<Native, "ref" | "type"> {
  name: string;
  onRef?: OnRef;
}

type OnRef = Native["ref"];
type Native = JSX.IntrinsicElements["select"];