import React from "react";
import { useAction, Action } from "mapineda48-react/useAction";
import * as reducer from "./reducer";
import * as thunk from "./thunk";
import * as view from "./view";

import type { Record, Select } from "service";
import type { Props as PConfirm } from "../Confirm";
import type { Modal } from "../Modals";

export function create(): State {
  return {
    ...create.view(),
    current: view.WELCOME,
    Modals: [],
    search: create.search(),
    create: create.create(),
  };
}

create.view = (): Init => {
  return {
    isLoading: false,
    confirm: null,
    view: "",
  };
};

create.search = (): Search => {
  return {
    ...create.view(),
    current: view.search.FILTER,
    results: [],
    shouldClose: false,
    query: {},
    scroll: {
      isLoading: false,
      canFetch: false,
    },
  };
};

create.create = (): Create => {
  return { ...create.view(), current: "" };
};

export default function useState() {
  const [state, setState] = React.useState(create);

  const [admin, http] = useAction(setState, reducer, thunk);

  return [state, admin, http] as const;
}

/**
 * Types
 */
export type Admin = Action<typeof reducer, State>;

export type Http = ReturnType<typeof useState>[2];

interface View {
  isLoading: boolean;
  confirm: Confirm;
}

interface Views extends View {
  current: string;
}

interface Search extends Views {
  query: Select;
  results: Record[];
  shouldClose: boolean;
  scroll: Scroll;
}

export interface Scroll {
  isLoading: boolean;
  canFetch: boolean;
}

interface Create extends Views {}

export interface State extends Views {
  search: Search;
  create: Create;
  Modals: Modal[];
}

interface Init {
  isLoading: boolean;
  confirm: Confirm;
  view: string;
}

export type Confirm = PConfirm | null;
