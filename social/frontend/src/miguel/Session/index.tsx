import React from "react";
import Login from "./Login";
import createSocket, { Socket } from "../../socket/miguel";

export const Context = React.createContext<Socket>(null as any);

export function useSession() {
  const state = React.useContext(Context);

  if (!state) {
    throw new Error("missing session");
  }

  return state;
}

export default function Session(props: Props) {
  const [state, setState] = React.useState<Socket | null>(null);

  if (!state) {
    return (
      <Login
        onToken={(token) => {
          const socket = createSocket(token);
          setState(socket);
        }}
      />
    );
  }

  return <Context.Provider value={state}>{props.children}</Context.Provider>;
}

/**
 * Types
 */
interface Props {
  children: React.ReactNode;
}