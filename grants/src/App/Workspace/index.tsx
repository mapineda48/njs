import { useState } from "../Context";
import Loading from "./Loading";
import Message from "./Message";

export default function Notification(props: Props) {
  const state = useState();

  if (state.isLoading) {
    return <Loading />;
  }

  if (state.message) {
    return <Message message={state.message} />;
  }

  return props.children;
}

export function Tool(props: Props) {
  const state = useState();

  if (state.isLoading || state.message) {
    return null;
  }

  return props.children;
}

/**
 * Types
 */
interface Props {
  children: JSX.Element;
}
