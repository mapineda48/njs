import { type } from "../parse";

export default function Integer(props: Props) {
  return <input {...props} type="number" name={type.integer(props.name)} />;
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