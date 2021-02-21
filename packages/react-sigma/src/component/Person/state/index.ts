import React from "react";
import { useAction } from "mapineda-react/setState";
import * as reducer from "./reducer";
import { Person } from "shared";

export function create(): State {
  return {
    full_name: "",
    department: "",
    city: "",
    email: "",
    message: "",
    ready: false,
    allFields: true,
  };
}

export default function usePerson(input: ArgHook) {
  const { current, allFields = false, onSend } = input;

  const [state, setState] = React.useState(() => {
    const pipe = current || create();

    const init: State = { message: "", allFields, ready: false, ...pipe };

    return init;
  });

  const person = useAction(setState, reducer);

  React.useEffect(() => {
    if (!state.ready) return;

    const { full_name, email, city, department } = state;

    onSend({ full_name, email, city, department });

    person.init();
  });

  return [state, person] as const;
}

/**
 * Types
 */

export interface State extends Person {
  message: string;
  ready: boolean;
  allFields: boolean;
}

export interface ArgHook {
  current?: Person;
  onSend: (person: Person) => void;
  allFields?: boolean;
}
