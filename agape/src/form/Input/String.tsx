import { type } from "../parse";

export default function Text(props: Props) {
  return <input {...props} type="text" />;
}

/**
 * Types
 */

interface Props extends Omit<Native, "ref" | "type"> {
  name: string;
  onRef?: OnRef;
}

type OnRef = Native["ref"];
type Native = JSX.IntrinsicElements["input"];
