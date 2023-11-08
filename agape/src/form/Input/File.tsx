import { type } from "../parse";

export default function File(props: Props) {
  return <input {...props} type="file" />;
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
