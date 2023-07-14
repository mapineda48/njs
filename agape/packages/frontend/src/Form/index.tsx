import React, { ReactNode } from "react";

export const ContextForm =
  React.createContext<React.MutableRefObject<any> | null>(null);

export function useRefForm() {
  const ref = React.useContext(ContextForm);

  if (!ref) {
    throw new Error("missing form ref");
  }

  return ref;
}

export default function FormProvider<T>(props: Props<T>) {
  const ref = React.useRef<any>(props.state);

  return (
    <ContextForm.Provider value={ref}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.onSubmit(ref.current);
        }}
      >
        {props.children}
      </form>
    </ContextForm.Provider>
  );
}

/**
 * Types
 */

interface Props<T> {
  children: ReactNode;
  state: T;
  onSubmit: (state: T) => void;
}
