import ReactDOM from "react-dom";
import React, {
  DependencyList,
  useCallback,
  useContext,
  useEffect,
} from "react";

const Context = React.createContext<PushToPortal>(() => {});

/**
 * If you wonder why I just don't use ReactDOM.createPortal,
 * it's because this way I can nested zindex and allow push
 * a function component with a callback
 */
export function usePortalToBody<T extends Props>(
  Element: FunctionComponent<T>,
  deps?: DependencyList
): (props: DiffProps<FunctionComponent<T>>) => void;
export function usePortalToBody(Element: any, deps: any = []): any {
  const pushToBody = useContext(Context);

  return useCallback(
    function pushModal(res: any = {}) {
      pushToBody((props) => <Element {...res} {...props} />);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pushToBody, ...deps]
  );
}

export default function PortalProvider(props: { children: React.ReactNode }) {
  const [state, setState] = React.useState<StateProvider>({ push: () => {} });

  const setPush = useCallback(
    (push: PushToPortal) => setState({ push }),
    [setState]
  );

  return (
    <Context.Provider value={state.push}>
      {props.children}
      <PortalFactory setPush={setPush} />
    </Context.Provider>
  );
}

/**
 * Prevent render all tree on update state
 */
export function PortalFactory(props: PortalFactoryProps) {
  const { setPush } = props;

  const [state, setState] = React.useState<State>([]);

  useEffect(
    () => setPush((el) => setState((state) => [...state, el])),
    [setPush]
  );

  const Elements = state.map((Element, index) => (
    <Element
      key={index}
      style={{ zIndex: 1500 + index * 100 }}
      remove={() =>
        setState((current) => {
          const state = [...current];
          state.splice(index, 1);
          return state;
        })
      }
    />
  ));

  return ReactDOM.createPortal(Elements, document.body);
}

/**
 * Types
 */
type DiffProps<T> = T extends (props: infer A) => JSX.Element
  ? Omit<A, keyof Props>
  : {};

type State = FunctionComponent[];

export type FunctionComponent<T extends Props = Props> = (
  props: T
) => JSX.Element;

export interface Props {
  style: React.CSSProperties;
  remove: () => void;
}

interface PortalFactoryProps {
  setPush: (push: PushToPortal) => void;
}

interface StateProvider {
  push: PushToPortal;
}

type PushToPortal = (Element: FunctionComponent) => void;
