import React from "react";
import Login from "./Login";
import createSocket, { Socket } from "../../socket/miguel";

export const Context = React.createContext<StateSession>(null as any);

export function useSession() {
  const state = React.useContext(Context);

  if (!state) {
    throw new Error("missing session");
  }

  return state;
}

export default function Session(props: Props) {
  const [state, setState] = React.useState<StateSession | null>(null);

  if (!state) {
    return (
      <Login
        onToken={(token) => {
          const socket = createSocket(token);

          setState({
            token,
            socket,
          });
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

interface StateSession {
  token: string;
  socket: Socket;
}
