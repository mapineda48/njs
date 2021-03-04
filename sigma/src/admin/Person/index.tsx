import PersonBase, { Props as BaseProps } from "components/Person";
import { useState } from "../state/Context";

export default function Person(props: Props) {
  const [state] = useState();

  return <PersonBase colombia={state.colombia} {...props} />;
}

/**
 * Types
 */
type Props = Omit<BaseProps, "colombia">;
