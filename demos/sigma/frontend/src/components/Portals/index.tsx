import ReactDOM from "react-dom";
import React from "react";
import { initAction } from "mp48-react/useState";

const useState = initAction({
  push(state: State, Element: Component): State {
    return [...state, Element];
  },
  splice(state: State, index: number): State {
    const next = [...state];

    next.splice(index, 1);

    return next;
  },
});

const Context = React.createContext<(Element: Component) => void>(() => {});

/**
 * If you wonder why I just don't use ReactDOM.createPortal,
 * it's because this way I can nested zindex.
 */
export function usePortalBody() {
  return React.useContext(Context);
}

export default function Portals(props: { children: React.ReactNode }) {
  const [state, , portal] = useState([]);

  const Elements = state.map((Element, index) => (
    <Element
      key={index}
      style={{ zIndex: 1500 + index * 100 }}
      remove={() => {
        portal.splice(index);
      }}
    />
  ));

  return (
    <Context.Provider value={portal.push}>
      {props.children}
      {ReactDOM.createPortal(Elements, document.body)}
    </Context.Provider>
  );
}

/**
 * Types
 */
export type Component = (props: Props) => JSX.Element;

type State = Component[];

interface Props {
  style: React.CSSProperties;
  remove: () => void;
}
