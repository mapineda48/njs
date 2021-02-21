import React from "react";
import ReactDOM from "react-dom";

const value: any = null;

const Context = React.createContext<Element>(value);

export function Actions({ container, children }: CProps) {
  const [state, setState] = React.useState<Element>(container.current);

  React.useEffect(() => {
    if (state === container.current) return;

    setState(container.current);
  }, [container, state]);

  return <Context.Provider value={state}>{children}</Context.Provider>;
}

export default function Action(props: Props) {
  const ref = React.useContext(Context);

  if (!ref) {
    return null;
  }

  return ReactDOM.createPortal(props.children, ref);
}

/**
 * Types
 */
export type Element = HTMLDivElement | null;

export type Ref = React.RefObject<HTMLDivElement>;

interface CProps {
  container: Ref;
  children: React.ReactNode;
}

interface Props {
  children: React.ReactNode;
}
