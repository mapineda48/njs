import React from "react";
import { useAction, Action } from "mapineda-react/useAction";
import * as reducer from "./reducer";
import * as thunk from "./thunk";

import type { Base as Switch } from "../Switch";

function create(): State {
  return { maps: { active: false, isLoading: false, message: "" } };
}

export default function useState() {
  const [state, setState] = React.useState(create);

  const [admin, adminAsync] = useAction(setState, reducer, thunk);

  return [state, admin, adminAsync] as const;
}

/**
 * Types
 */
export interface State {
  maps: Switch;
}

export type Admin = Action<typeof reducer, State>;
