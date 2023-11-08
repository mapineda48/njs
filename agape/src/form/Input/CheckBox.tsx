import { type } from "../parse";

export default function Checkbox(props: Props) {
  return <input {...props} type="checkbox" name={type.boolean(props.name)} />;
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
