import React from "react";
import useGrantsHook from "../state";

const value: any = null;

const Context = React.createContext<Value>(value);

export function useGrants() {
  return React.useContext(Context);
}

export default Context;

/**
 * Typings
 */
type Value = ReturnType<typeof useGrantsHook>;
