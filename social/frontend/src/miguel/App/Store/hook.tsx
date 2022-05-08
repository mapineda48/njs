import React from "react";
import {
  useDispatch as useDispatchCore,
  useSelector as useSelectorCore,
} from "react-redux";
import { Action, prepareActions } from "./action";

import type { State } from "./store";

const ContextDispatch = React.createContext<Action>(null as any);

export function Dispatch(props: Props) {
  const dispatch = useDispatchCore();

  const action = React.useMemo(() => prepareActions(dispatch), [dispatch]);

  return (
    <ContextDispatch.Provider value={action}>
      {props.children}
    </ContextDispatch.Provider>
  );
}

export function useDispatch() {
  return React.useContext(ContextDispatch);
}

export const useSelector: <T>(selector: (state: State) => T) => T =
  useSelectorCore as any;

/**
 * Types
 */

interface Props {
  children: React.ReactNode;
}
