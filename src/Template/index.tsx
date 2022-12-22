import ReactTemplate from "./React";
import Example from "./Example2";
import "./index.css";

export default function Template(props: Props) {
  switch (props.template) {
    case "react":
      return <ReactTemplate data={props.data}></ReactTemplate>;
      case "example":
        return <Example ></Example>;
    default:
      return <h1>Not Found</h1>;
  }
}

/**
 * Types
 */
export interface Props {
  template: string;
  data?: any;
}
