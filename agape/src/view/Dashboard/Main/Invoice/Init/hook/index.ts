import React from "react";
import { create } from "./state";
import * as reducer from "./reducer";
import { wrapSetState } from "util/setState";

export const useState = () => {
  const [state, setState] = React.useState(create);

  const setStateWrap = React.useMemo(() => {
    return wrapSetState(setState, reducer);
  }, [setState]);

  return [state, setStateWrap] as const;
};

/**
 * Typings
 */

type Reducer = typeof reducer;

type Result = ReturnType<Reducer[keyof Reducer]>;

export type SetState = ReturnType<typeof useState>[1];
