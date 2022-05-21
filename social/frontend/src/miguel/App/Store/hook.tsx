import React from "react";
import {
  useDispatch as useDispatchCore,
  useSelector as useSelectorCore,
} from "react-redux";
import { useSession } from "../Session";
import { action as actionSync } from "./action";
import prepareThunk, { ActionThunk } from "./thunk";
import { prepareDispatch } from "./util";

import type { State } from "./store";

const ContextDispatch = React.createContext<ActionThunk>(null as any);

export function Dispatch(props: Props) {
  const dispatch = useDispatchCore();
  const session = useSession();

  const action = React.useMemo(() => {
    const action = prepareThunk(session, actionSync);

    return prepareDispatch(dispatch, action);
  }, [dispatch, session]);

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
