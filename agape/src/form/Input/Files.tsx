import { type } from "../parse";

export default function Files(props: Props) {
  return (
    <input {...props} multiple type="file" name={type.files(props.name)} />
  );
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
